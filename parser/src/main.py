import asyncio
import aiohttp
from math import ceil
import psycopg2
from psycopg2.extras import RealDictCursor
from bs4 import BeautifulSoup
from json import loads


conn = psycopg2.connect(
	host="db",
	port=5432,
	dbname="mydb",
	user="user",
	password="password"
)
cur = conn.cursor(cursor_factory=RealDictCursor)

GET_CAR_LIST_URL = 'https://api.encar.com/search/car/list/premium?count=true&q=(And.Hidden.N._.CarType.Y.)&sr=%7CModifiedDate'

async def fetch(session, url, soup=False):
	try:
		async with session.get(url) as response:
			if soup:
				return BeautifulSoup(await response.text(), 'html.parser')
			return await response.json()
	except Exception as error:
		print(url, error)

async def save_to_database(car, session):
	Id = car["Id"]
	result = await fetch(session, f'https://fem.encar.com/cars/detail/{Id}', True)
	if not result: return
	target = None
	for i in result.select('body script'):
		if '__PRELOADED_STATE__' in i.text:
			target = loads(i.text.replace('__PRELOADED_STATE__ = ', ''))
			break
	gradeDetailEnlishName = target['cars']['base']['category']['gradeDetailEnglishName']
	modelGroupEnglishName = target['cars']['base']['category']['modelGroupEnglishName']
	gradeEnglishName = target['cars']['base']['category']['gradeEnglishName']
	manufacturerEnglishName = target['cars']['base']['category']['manufacturerEnglishName']
	name = ''
	if gradeDetailEnlishName: name += gradeDetailEnlishName + ' '
	if modelGroupEnglishName: name += modelGroupEnglishName + ' '
	if gradeEnglishName: name += gradeEnglishName + ' '
	if manufacturerEnglishName: name += manufacturerEnglishName

	image = f'https://ci.encar.com/carpicture{target["cars"]["base"]["photos"][0]["path"]}'
	year = target['cars']['base']['category']["yearMonth"][:2]
	year = f'20{year}' if int(year) > 26 else f'19{year}'
	mileage = target['cars']['base']['spec']['mileage']
	price = target['cars']['base']['advertisement']['price']
	engine = target['cars']['base']['spec']['displacement'] / 100
	cur.execute(f"SELECT * FROM car_car WHERE id=%s", (Id,))
	car = cur.fetchone()
	if car:
		cur.execute("""
		UPDATE car_car SET images=%s, name=%s, year=%s, mileage=%s, engine=%s, price=%s
		WHERE id=%s
		""", (
			[image],
			name,
			year,
			mileage,
			engine,
			price,
			Id
		))

		conn.commit()
	else:
		cur.execute("""
		INSERT INTO car_car (id, images, name, year, mileage, engine, price)
		VALUES (%s, %s, %s, %s, %s, %s, %s)
		""", (
			Id,
			[image],
			name,
			year,
			mileage,
			engine,
			price
		))

		conn.commit()

async def main():
	
	while 1:
		timeout = aiohttp.ClientTimeout(total=30)
		async with aiohttp.ClientSession(timeout=timeout) as session:

			results = []
			page = 0
			count = 0
			step = 1000
			cursor = ''
			while 1:
				data = await fetch(session, f'{GET_CAR_LIST_URL}%7C{page * step}%7C{step}{cursor}')
				if data:
					count = data['Count']
					results.append(data)
					if data.get('paging') and data['paging'].get('next'):
						cursor = f'&cursor={data['paging']['next']}'
					else:
						cursor = ''

				page += 1
				print(page * step, '/', count, cursor)
				if page * step > count or True:
					break

			tasks = []
			for content in results:
				if content:
					for car in content['SearchResults']:
						tasks.append(save_to_database(car, session))
			
			await asyncio.gather(*tasks)
						
			print("save")
		
		await asyncio.sleep(24*60*60)

if __name__ == "__main__":
	asyncio.run(main())