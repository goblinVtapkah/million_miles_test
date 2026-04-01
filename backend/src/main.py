from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor


conn = psycopg2.connect(
	host="db",
	port=5432,
	dbname="mydb",
	user="user",
	password="password"
)
cur = conn.cursor(cursor_factory=RealDictCursor)

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

pageSize = 28

@app.get("/{page}")
async def getPage(page: int):
	if page < 1: page = 1
	cur.execute(f"SELECT * FROM cars LIMIT {pageSize} OFFSET {(page - 1) * pageSize}")
	cars = cur.fetchall()
	cur.execute(f"SELECT COUNT(*) FROM cars")
	count = cur.fetchone()
	return {
		"cars": cars,
		"cars_count": count['count']
	}

@app.get("/car/{id}")
async def getCar(id: int):
	cur.execute(f"SELECT * FROM cars WHERE id=%s", (id,))
	car = cur.fetchone()
	return car