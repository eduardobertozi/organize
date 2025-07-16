'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchSaleServants } from '@/http/actions/sales/fetch-sale-servants'

export const useFetchSaleServants = (saleId: string) => {
	const saleServants = useQuery({
		queryKey: ['sale-servants', saleId],
		queryFn: () => fetchSaleServants(saleId),
		staleTime: 1000 * 60 * 5,
	})

	return saleServants
}
