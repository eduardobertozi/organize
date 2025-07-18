import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useDebounce } from '@/components/ui/multiselect'
import { usePagination } from '@/hooks/use-pagination'
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
	const page = useGlobalStore((state) => state.currentPage)

	const params = {
		search: debouncedSearch,
		page,
	}

	const response = useQuery({
		queryKey: ['clients', params],
		queryFn: () => fetchClients(params),
		enabled: !!debouncedSearch || !!page,
	})

	if (response.error) {
		toast.error('Erro ao buscar clientes')
	}

	usePagination({ total: response.data?.total ?? 1 })

	return response
}
