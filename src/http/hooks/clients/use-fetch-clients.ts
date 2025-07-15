import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@/components/ui/multiselect'
import { fetchClients } from '@/http/actions/clients/fetch-clients'
import { useGlobalStore } from '@/store/global'

// const clientsList = [
// 	{
// 		label: 'John Doe',
// 		value: uuid(),
// 	},
// 	{
// 		label: 'Phillip Anselmus',
// 		value: uuid(),
// 	},
// 	{
// 		label: 'Ozzy Osbourne',
// 		value: uuid(),
// 	},
// 	{
// 		label: 'Ryan Dall',
// 		value: uuid(),
// 	},
// 	{
// 		label: 'Judgehead Jones',
// 		value: uuid(),
// 	},
// 	{
// 		label: 'Archie Andrews',
// 		value: uuid(),
// 	},
// ]

// async function fetchClients(name: string) {
// 	if (!name) {
// 		return []
// 	}

// 	return await new Promise<Option[]>((resolve) => {
// 		setTimeout(
// 			() =>
// 				resolve(
// 					clientsList.filter((client) =>
// 						client.label.toLowerCase().includes(name.toLowerCase())
// 					)
// 				),
// 			300
// 		)
// 	})
// }

export const useFetchClients = () => {
	const search = useGlobalStore((state) => state.search)
	const debouncedSearch = useDebounce(search, 500)

	const clients = useQuery({
		queryKey: ['clients', debouncedSearch],
		queryFn: () => fetchClients(debouncedSearch),
		enabled: !!debouncedSearch,
		// staleTime: 1000 * 60 * 5,
	})

	return clients
}
