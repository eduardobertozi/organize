import { useQuery } from '@tanstack/react-query'
import { uuid } from '@/lib/uuid'
import { useGlobalStore } from '@/store/global'
import type { Option } from '@/types/option'

const clientsList = [
	{
		label: 'John Doe',
		value: uuid(),
	},
	{
		label: 'Phillip Anselmus',
		value: uuid(),
	},
	{
		label: 'Ozzy Osbourne',
		value: uuid(),
	},
	{
		label: 'Ryan Dall',
		value: uuid(),
	},
	{
		label: 'Judgehead Jones',
		value: uuid(),
	},
	{
		label: 'Archie Andrews',
		value: uuid(),
	},
]

async function fetchClients(name: string) {
	if (!name) {
		return []
	}

	return await new Promise<Option[]>((resolve) => {
		setTimeout(
			() =>
				resolve(
					clientsList.filter((client) =>
						client.label.toLowerCase().includes(name.toLowerCase())
					)
				),
			300
		)
	})
}

export const useFetchClients = () => {
	const { search } = useGlobalStore((state) => state)

	const clients = useQuery({
		queryKey: ['clients', search],
		queryFn: () => fetchClients(search),
		enabled: !!search,
		staleTime: 1000 * 60 * 5,
	})

	return clients
}
