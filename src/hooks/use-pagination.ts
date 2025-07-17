'use client'

import { useEffect } from 'react'
import { useGlobalStore } from '@/store/global'

type UsePaginationProps<T> = {
	data: T[]
}

export const usePagination = <T>({ data }: UsePaginationProps<T>) => {
	const setTotalPages = useGlobalStore((state) => state.setTotalPages)

	useEffect(() => {
		setTotalPages(Math.ceil(data.length / 10))
	}, [data, setTotalPages])
}
