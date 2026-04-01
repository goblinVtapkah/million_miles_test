'use client'
import { Dispatch, ReactNode, SetStateAction, type FC } from 'react'
import { PaginationButtons } from '../PaginationButtons/PaginationButtons'

type Props = {
	children: ReactNode
	currentPagination: number
	setCurrentPagination: Dispatch<SetStateAction<number>>
	pageCount: number
}

// компонент оборачивающий в пагинацию
export const Pagination: FC<Props> = ({
	children,
	currentPagination,
	setCurrentPagination,
	pageCount,
}) => {
	const paginationButtons = (
		<PaginationButtons
			currentPagination={currentPagination}
			setCurrentPagination={setCurrentPagination}
			pageCount={pageCount}
		/>
	)
	return (
		<div className="flex flex-col">
			{paginationButtons}
			{children}
			{paginationButtons}
		</div>
	)
}
