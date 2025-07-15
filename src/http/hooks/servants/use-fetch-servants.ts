import { useQuery } from '@tanstack/react-query'
import { fetchServants } from '@/http/actions/servants/fetch-servants'

// const servantsList: Servant[] = [
// 	{
// 		id: uuid(),
// 		description: 'Cabelo',
// 		value: 35,
// 		products: [uuid()],
// 	},
// 	{
// 		id: uuid(),
// 		description: 'Barba',
// 		value: 35,
// 		products: [uuid()],
// 	},
// 	{
// 		id: uuid(),
// 		description: 'Cabelo e Barba',
// 		value: 35,
// 		products: [uuid()],
// 	},
// ]

// async function fetchServants() {
// 	return await new Promise<Servant[]>((resolve) => {
// 		setTimeout(() => resolve(servantsList), 300)
// 	})
// }

export const useFetchServants = () => {
	const servants = useQuery({
		queryKey: ['servants'],
		queryFn: () => fetchServants(),
		staleTime: 1000 * 60 * 5,
	})

	return servants
}
