import { useQuery } from '@tanstack/react-query'
import { uuid } from '@/lib/uuid'
import type { Option } from '@/types/option'
import type { Product } from '@/types/product'
import { transformToOptions } from '@/utils/data-to-options'

const productsList: Product[] = [
	{
		id: uuid(),
		description: 'Lâmina',
		supplierId: uuid(),
		coast: 0.5,
	},
	{
		id: uuid(),
		description: 'Gola Higiênica',
		supplierId: uuid(),
		coast: 1.0,
	},
]

async function fetchProducts() {
	return await new Promise<Product[]>((resolve) => {
		setTimeout(() => resolve(productsList), 300)
	})
}

export const useFetchProducts = () => {
	const products = useQuery({
		queryKey: ['products'],
		queryFn: () => fetchProducts(),
		staleTime: 1000 * 60 * 5,
	})

	return products
}

async function fetchProductsOptions() {
	return await new Promise<Option[]>((resolve) => {
		setTimeout(
			() =>
				resolve(
					transformToOptions(productsList, {
						label: 'description',
						value: 'id',
					})
				),
			300
		)
	})
}

export const useFetchProductsOptions = () => {
	const products = useQuery({
		queryKey: ['products-options'],
		queryFn: () => fetchProductsOptions(),
		staleTime: 1000 * 60 * 5,
	})

	return products
}
