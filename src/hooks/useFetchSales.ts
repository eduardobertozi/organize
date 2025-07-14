import { useQuery } from '@tanstack/react-query'
import { uuid } from '@/lib/uuid'
import type { SaleDetails } from '@/types/sale'

const salesList: SaleDetails[] = [
	{
		id: uuid(),
		name: 'John Doe - Corte e Barba',
		date: new Date('2025-07-15'),
		status: 'completed',
		amount: 100,
	},
	{
		id: uuid(),
		name: 'John Doe - Corte',
		date: new Date('2025-07-15'),
		status: 'awaiting',
		amount: 100,
	},
	{
		id: uuid(),
		name: 'John Doe - Corte e Barba',
		date: new Date('2025-07-15'),
		status: 'canceled',
		amount: 100,
	},
	{
		id: uuid(),
		name: 'John Doe - Corte e Barba',
		date: new Date('2025-07-15'),
		status: 'completed',
		amount: 100,
	},
	{
		id: uuid(),
		name: 'John Doe - Corte e Barba',
		date: new Date('2025-07-15'),
		status: 'awaiting',
		amount: 100,
	},
	{
		id: uuid(),
		name: 'John Doe - Corte e Barba',
		date: new Date('2025-07-15'),
		status: 'completed',
		amount: 100,
	},
]

async function fetchSales() {
	return await new Promise<SaleDetails[]>((resolve) => {
		setTimeout(() => {
			resolve(salesList)
		}, 1500)
	})
}

export const useFetchSales = () => {
	const sales = useQuery<SaleDetails[]>({
		queryKey: ['sales'],
		queryFn: () => fetchSales(),
	})

	return sales
}
