import { useQuery } from '@tanstack/react-query'
import { uuid } from '@/lib/uuid'
import type { Option } from '@/types/option'

const servantsList = [
	{
		value: uuid(),
		label: 'Cabelo',
	},
	{
		value: uuid(),
		label: 'Barba',
	},
	{
		value: uuid(),
		label: 'Cabelo e Barba',
	},
]

async function fetchServants() {
	return await new Promise<Option[]>((resolve) => {
		setTimeout(() => resolve(servantsList), 300)
	})
}

export const useFetchServants = () => {
	const servants = useQuery({
		queryKey: ['servants'],
		queryFn: () => fetchServants(),
		staleTime: 1000 * 60 * 5,
	})

	return servants
}
