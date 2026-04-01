'use client'
import { useEffect, useState } from 'react'
import { Pagination } from '../Pagination/Pagination'
import { NextArrowIcon } from '../icons/NextArrowIcon'
import { useGetCarsQuery } from '@/app/store/apiSlice'
import { Link } from 'react-router-dom'

// компонент с спаршенными машинами и пагинацией
export const Cars = () => {
	const [currentPagination, setCurrentPagination] = useState<number>(1)
	const [pageCount, setPageCount] = useState<number | null>(null)
	const { data: cars } = useGetCarsQuery(currentPagination)

	console.log(cars)

	useEffect(() => {
		if (pageCount || !cars) return
		setPageCount(Math.ceil(cars.cars_count / 28))
	}, [pageCount, cars])

	return (
		<Pagination
			currentPagination={currentPagination}
			setCurrentPagination={setCurrentPagination}
			pageCount={pageCount ?? 1}
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{cars ? (
					cars.cars.map((car) => (
						<Link to={`/car/${car.id}`}>
							<div
								key={car.id}
								className="cursor-pointer group/card flex flex-col bg-white border border-neutral-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full relative"
							>
								<div className="relative w-full aspect-4/3 overflow-hidden bg-neutral-100 group/carousel">
									<img src={car.images[0]} alt="" />
								</div>
								<div className="flex flex-col grow p-5">
									<div className="mb-4">
										<h3 className="text-lg font-bold text-neutral-950 uppercase leading-tight truncate">
											{car.name}
										</h3>
										<p className="text-neutral-500 text-sm mt-1">{car.year}</p>
									</div>
									<div className="grid grid-cols-2 gap-y-2 text-sm text-neutral-600 mb-6 border-b border-neutral-100 pb-4">
										<div>
											<span className="block text-xs text-neutral-400">Mileage</span>
											<span>{car.mileage.toLocaleString()} km</span>
										</div>
										<div className="text-right">
											<span className="block text-xs text-neutral-400">Engine</span>
											{car.engine} L
										</div>
									</div>
									<div className="mt-auto flex items-end justify-between">
										<div className="flex flex-col w-full">
											<span className="text-xs text-neutral-400 uppercase">Price</span>
											<span className="text-xl font-bold text-main whitespace-nowrap">
												{car.price.toLocaleString('en-GB')} <span className="text-sm">USD</span>
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover/card:text-main transition-colors pl-4 whitespace-nowrap">
											Details
											<NextArrowIcon />
										</div>
									</div>
								</div>
							</div>
						</Link>
					))
				) : (
					<>...Wait...</>
				)}
			</div>
		</Pagination>
	)
}
