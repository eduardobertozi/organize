import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useDebounce } from '@/components/ui/multiselect'
import { fetchProducts } from '@/http/actions/products/fetch-products'
import { useGlobalStore } from '@/store/global'

export const useFetchProducts = () => {
	const search = useGlobalStore((state) => state.search)
	const debouncedSearch = useDebounce(search, 500)
	const page = useGlobalStore((state) => state.currentPage)

	const params = {
		search: debouncedSearch,
		page,
	}

	const products = useQuery({
		queryKey: ['products', params],
		queryFn: () => fetchProducts(params),
		enabled: !!debouncedSearch || !!page,
	})

	if (products.error) {
		toast.error('Erro ao buscar produtos')
	}

	return products
}
