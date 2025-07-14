import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { FormAddProductData } from '@/app/[slug]/routes/products/form-add-product'
import { useSheetToggle } from '@/components/ui/sheet'

export const useEditProduct = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const addProduct = useMutation({
		mutationFn: async (data: FormAddProductData) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return data
		},
		onSuccess: (data) => {
			console.log(data)
			toggle()
			toast.success('Produto editado com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['products', 'products-options'],
			})
		},
	})

	return addProduct
}
