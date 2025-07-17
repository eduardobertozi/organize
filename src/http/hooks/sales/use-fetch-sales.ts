import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useDebounce } from '@/components/ui/multiselect'
import { fetchSales } from '@/http/actions/sales/fetch-sales'
import { useGlobalStore } from '@/store/global'

// const salesList: SaleDetails[] = [
// 	{
// 		id: uuid(),
// 		name: 'John Doe - Corte e Barba',
// 		date: new Date('2025-07-15'),
// 		status: 'completed',
// 		amount: 100,
// 	},
// 	{
// 		id: uuid(),
// 		name: 'John Doe - Corte',
// 		date: new Date('2025-07-15'),
// 		status: 'awaiting',
// 		amount: 100,
// 	},
// 	{
// 		id: uuid(),
// 		name: 'John Doe - Corte e Barba',
// 		date: new Date('2025-07-15'),
// 		status: 'cancelled',
// 		amount: 100,
// 	},
// 	{
// 		id: uuid(),
// 		name: 'John Doe - Corte e Barba',
// 		date: new Date('2025-07-15'),
// 		status: 'completed',
// 		amount: 100,
// 	},
// 	{
// 		id: uuid(),
// 		name: 'John Doe - Corte e Barba',
// 		date: new Date('2025-07-15'),
// 		status: 'awaiting',
// 		amount: 100,
// 	},
// 	{
// 		id: uuid(),
// 		name: 'John Doe - Corte e Barba',
// 		date: new Date('2025-07-15'),
// 		status: 'completed',
// 		amount: 100,
// 	},
// ]

// async function fetchSales() {
// 	return await new Promise<SaleDetails[]>((resolve) => {
// 		setTimeout(() => {
// 			resolve(salesList)
// 		}, 1500)
// 	})
// }

export const useFetchSales = () => {
	const search = useGlobalStore((state) => state.search)
	const debouncedSearch = useDebounce(search, 500)
	const page = useGlobalStore((state) => state.currentPage)

	const params = {
		search: debouncedSearch,
		page,
	}

	const sales = useQuery({
		queryKey: ['sales', params],
		queryFn: () => fetchSales(params),
		enabled: !!debouncedSearch || !!page,
	})

	if (sales.error) {
		toast.error('Erro ao buscar vendas')
	}

	return sales
}
