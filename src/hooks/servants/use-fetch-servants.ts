import { useQuery } from '@tanstack/react-query'
import { uuid } from '@/lib/uuid'
import type { Option } from '@/types/option'
import type { Servant } from '@/types/servant'

const servantsList: Servant[] = [
	{
		id: uuid(),
		description: 'Cabelo',
		value: 35,
		products: [uuid()],
	},
	{
		id: uuid(),
		description: 'Barba',
		value: 35,
		products: [uuid()],
	},
	{
		id: uuid(),
		description: 'Cabelo e Barba',
		value: 35,
		products: [uuid()],
	},
]

function transformToOptions(servants: Servant[]): Option[] {
	return servants.map((servant) => ({
		label: servant.description,
		value: servant.id,
	}))
}

async function fetchServants() {
	return await new Promise<Servant[]>((resolve) => {
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

async function fetchServantsOptions() {
	return await new Promise<Option[]>((resolve) => {
		setTimeout(() => resolve(transformToOptions(servantsList)), 300)
	})
}

export const useFetchServantsOptions = () => {
	const servants = useQuery({
		queryKey: ['servants-options'],
		queryFn: () => fetchServantsOptions(),
		staleTime: 1000 * 60 * 5,
	})

	return servants
}
