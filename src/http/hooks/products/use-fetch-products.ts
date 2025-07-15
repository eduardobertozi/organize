import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/http/actions/products/fetch-products'

// const productsList: Product[] = [
// 	{
// 		id: uuid(),
// 		description: 'Lâmina',
// 		supplierId: uuid(),
// 		quantity: 1000,
// 		coast: 0.5,
// 	},
// 	{
// 		id: uuid(),
// 		description: 'Gola Higiênica',
// 		supplierId: uuid(),
// 		quantity: 1000,
// 		coast: 1.0,
// 	},
// ]

// async function fetchProducts() {
// 	return await new Promise<Product[]>((resolve) => {
// 		setTimeout(() => resolve(productsList), 300)
// 	})
// }

export const useFetchProducts = () => {
	const products = useQuery({
		queryKey: ['products'],
		queryFn: () => fetchProducts(),
		staleTime: 1000 * 60 * 5,
	})

	return products
}
