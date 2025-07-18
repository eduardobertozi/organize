'use client'

import { useEffect } from 'react'
import { useGlobalStore } from '@/store/global'

type UsePaginationProps = {
	total: number
}

export const usePagination = ({ total }: UsePaginationProps) => {
	const setTotalPages = useGlobalStore((state) => state.setTotalPages)

	useEffect(() => {
		setTotalPages(Math.ceil(total / 10))
	}, [total, setTotalPages])
}
