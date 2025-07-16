'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchServantProducts } from '@/http/actions/servants/fetch-servant-products'

export const useFetchServantProducts = (servantId: string) => {
	const servantProducts = useQuery({
		queryKey: ['servant-products', servantId],
		queryFn: () => fetchServantProducts(servantId),
		staleTime: 1000 * 60 * 5,
	})

	return servantProducts
}
