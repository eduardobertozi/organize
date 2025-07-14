import { useQuery } from '@tanstack/react-query'
import { getSalesCount } from '@/http/actions/sales/get-sales-count'

export const useGetSalesCount = () => {
	const response = useQuery({
		queryKey: ['sales'],
		queryFn: () => getSalesCount(),
	})

	return response
}
