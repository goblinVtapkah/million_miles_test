'use client'
import { useGetCarQuery } from '@/app/store/apiSlice'
import { Link, useParams } from 'react-router-dom'
import { ArrowIcon } from '../icons/ArrowIcon'

export const CarCard = () => {
	const { id } = useParams()
	const { data: car } = useGetCarQuery(Number(id), {
		skip: !id,
	})

	return car ? (
		<div className="h-full flex justify-center gap-6 flex-col">
			<Link to="/">
				<button className="text-neutral-700 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:border-main hover:text-main disabled:opacity-50 disabled:hover:border-neutral-200 cursor-pointer disabled:cursor-default">
					<ArrowIcon />
				</button>
			</Link>
			<div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] lg:grid-cols-[1.6fr_1fr] gap-4 xl:gap-12 pb-8 items-start bg-neutral-50">
				<div className="relative w-full aspect-16/10 rounded-3xl overflow-hidden bg-neutral-100 group cursor-pointer border border-neutral-200">
					<img
						style={{ height: '100%', width: '100%' }}
						src={car?.images[0]}
						className="object-cover transition-all duration-500 select-none ease-in-out hover:scale-105 opacity-100"
						alt=""
					/>
				</div>
				<div className="flex flex-col gap-6">
					<div>
						<h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-950 uppercase leading-none tracking-tight">
							{car.name}
						</h1>
						<p className="text-xl text-neutral-400 font-medium mt-2 select-none">{car.year}</p>
					</div>
					<div className="bg-neutral-950 rounded-3xl p-6 md:p-8 text-white flex flex-col gap-6 shadow-xl relative overflow-hidden group">
						<div className="relative z-10">
							<span className="block text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">
								price
							</span>
							<div className="flex items-baseline gap-2">
								<span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
									{car.price.toLocaleString('en-GB')}
								</span>
								<span className="text-xl font-medium text-main">USD</span>
							</div>
						</div>
						<button className="w-full text-md cursor-pointer bg-main text-black font-semibold py-3 px-6 rounded-xl hover:bg-white focus:outline-none focus:ring-2 focus:ring-main-light hover:text-black hover:ring-2 hover:ring-main transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full bg-main hover:bg-white hover:text-neutral-950 text-neutral-950 font-bold border-2 border-main transition-all duration-300">
							{' '}
							Buy now
						</button>
					</div>
					<div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-neutral-100">
						<h3 className="text-lg font-bold mb-6 text-neutral-900 ltr:border-l-4 rtl:border-r-4 border-main ltr:pl-3 rtl:pr-3 uppercase">
							Specifications
						</h3>
						<div className="flex justify-between items-center py-3 border-b border-neutral-100 last:border-0 group hover:bg-neutral-50 px-2 rounded-lg transition-colors">
							<span className="text-neutral-500 font-medium">Mileage</span>
							<span className="text-neutral-900 font-semibold text-right group-hover:text-black">
								{car.mileage.toLocaleString()} km
							</span>
						</div>
						<div className="flex justify-between items-center py-3 border-b border-neutral-100 last:border-0 group hover:bg-neutral-50 px-2 rounded-lg transition-colors">
							<span className="text-neutral-500 font-medium">Engine</span>
							<span className="text-neutral-900 font-semibold text-right group-hover:text-black">
								{car.engine} L
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<>...Wait...</>
	)
}
