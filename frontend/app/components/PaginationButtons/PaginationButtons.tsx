'use client'
import { Dispatch, ReactNode, SetStateAction, type FC } from 'react'
import { ArrowIcon } from '../icons/ArrowIcon'

type ButtonsProps = {
	currentPagination: number
	setCurrentPagination: Dispatch<SetStateAction<number>>
	pageCount: number
}

type ButtonProps = {
	children: ReactNode
	className: string
	onClick?: () => void
	disabled?: boolean
}

// варианты tilewind для кнопок
const classButtonVariant = {
	leftArrow:
		'text-neutral-700 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:border-main hover:text-main disabled:opacity-50 disabled:hover:border-neutral-200 cursor-pointer disabled:cursor-default',
	rightArrow:
		'text-neutral-700 rotate-180 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:border-main hover:text-main disabled:opacity-50 disabled:hover:border-neutral-200 cursor-pointer disabled:cursor-default',
	numberButton:
		'text-neutral-700 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-xs md:text-sm font-medium transition-allbg-white border border-neutral-200 text-neutral-700 hover:border-main hover:text-main cursor-pointer',
	currentButton:
		'w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-xs md:text-sm font-medium transition-all bg-main text-white shadow-md border border-main',
	voidButton:
		'w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-xs md:text-sm font-medium transition-all cursor-default text-neutral-400',
}

// компонент одной кнопки (не стал выносить в отдельный файл)
const PaginationButton: FC<ButtonProps> = ({ children, className, disabled, onClick }) => {
	return (
		<button disabled={disabled} className={className} onClick={onClick}>
			{children}
		</button>
	)
}

// компонент кнопок пагинации
export const PaginationButtons: FC<ButtonsProps> = ({
	currentPagination,
	setCurrentPagination,
	pageCount,
}) => {
	const numberButtons: ReactNode[] = []

	if (pageCount <= 7) {
		// если у нас меньше 7 страниц пагинации, просто выводим 7 кнопок
		Array.from({ length: pageCount })
			.map((_, index) => {
				const pageNumber = index + 1
				return (
					<PaginationButton
						key={index}
						onClick={setCurrentPagination.bind(null, pageNumber)}
						className={
							pageNumber === currentPagination
								? classButtonVariant.currentButton
								: classButtonVariant.numberButton
						}
					>
						{pageNumber}
					</PaginationButton>
				)
			})
			.forEach((element) => {
				numberButtons.push(element)
			})
	} else if (currentPagination < 5) {
		// если у нас больше 7 страниц пагинации, и мы находимся в начале пагинации (от 1 до 4)
		Array.from({ length: 5 })
			.map((_, index) => {
				const pageNumber = index + 1
				return (
					<PaginationButton
						key={index}
						onClick={setCurrentPagination.bind(null, pageNumber)}
						className={
							pageNumber === currentPagination
								? classButtonVariant.currentButton
								: classButtonVariant.numberButton
						}
					>
						{pageNumber}
					</PaginationButton>
				)
			})
			.forEach((element) => {
				numberButtons.push(element)
			})
		numberButtons.push(
			...[
				<PaginationButton className={classButtonVariant.voidButton} disabled>
					...
				</PaginationButton>,
				<PaginationButton
					onClick={setCurrentPagination.bind(null, pageCount)}
					className={classButtonVariant.numberButton}
				>
					{pageCount}
				</PaginationButton>,
			],
		)
	} else if (currentPagination > pageCount - 4) {
		// если у нас больше 7 страниц пагинации, и мы находимся в конце пагинации (от n-4 до n, где n последняя страница)
		numberButtons.push(
			...[
				<PaginationButton
					onClick={setCurrentPagination.bind(null, 1)}
					className={classButtonVariant.numberButton}
				>
					{1}
				</PaginationButton>,
				<PaginationButton className={classButtonVariant.voidButton} disabled>
					...
				</PaginationButton>,
			],
		)
		Array.from({ length: 5 })
			.map((_, index) => {
				const pageNumber = pageCount - 4 + index
				return (
					<PaginationButton
						key={index}
						onClick={setCurrentPagination.bind(null, pageNumber)}
						className={
							pageNumber === currentPagination
								? classButtonVariant.currentButton
								: classButtonVariant.numberButton
						}
					>
						{pageNumber}
					</PaginationButton>
				)
			})
			.forEach((element) => {
				numberButtons.push(element)
			})
	} else {
		// если у нас больше 7 страниц пагинации, и мы находимся в середине
		numberButtons.push(
			...[
				<PaginationButton
					onClick={setCurrentPagination.bind(null, 1)}
					className={classButtonVariant.numberButton}
				>
					{1}
				</PaginationButton>,
				<PaginationButton className={classButtonVariant.voidButton} disabled>
					...
				</PaginationButton>,
			],
		)
		Array.from({ length: 3 })
			.map((_, index) => {
				const pageNumber = currentPagination - 1 + index
				return (
					<PaginationButton
						key={index}
						onClick={setCurrentPagination.bind(null, pageNumber)}
						className={
							pageNumber === currentPagination
								? classButtonVariant.currentButton
								: classButtonVariant.numberButton
						}
					>
						{pageNumber}
					</PaginationButton>
				)
			})
			.forEach((element) => {
				numberButtons.push(element)
			})
		numberButtons.push(
			...[
				<PaginationButton className={classButtonVariant.voidButton} disabled>
					...
				</PaginationButton>,
				<PaginationButton
					onClick={setCurrentPagination.bind(null, pageCount)}
					className={classButtonVariant.numberButton}
				>
					{pageCount}
				</PaginationButton>,
			],
		)
	}

	return (
		<div className="py-6 flex gap-1 justify-center">
			<PaginationButton
				disabled={currentPagination === 1}
				onClick={setCurrentPagination.bind(null, currentPagination - 1)}
				className={classButtonVariant.leftArrow}
			>
				<ArrowIcon />
			</PaginationButton>
			{numberButtons}
			<PaginationButton
				disabled={pageCount === currentPagination}
				onClick={setCurrentPagination.bind(null, currentPagination + 1)}
				className={classButtonVariant.rightArrow}
			>
				<ArrowIcon />
			</PaginationButton>
		</div>
	)
}
