import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { createProduct } from '@/http/actions/products/create-product'
import { updateProduct } from '@/http/actions/products/update-product'
import type { FormAddProductData } from '@/schemas/add-product-schema'

export const useAddProduct = (id?: string) => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const addProduct = useMutation({
		mutationFn: async (data: FormAddProductData) => {
			if (id) {
				await updateProduct(data, id)
				return id
			}

			await createProduct(data)
		},
		onSuccess: () => {
			toggle()
			toast.success(
				id ? 'Produto atualizado com sucesso' : 'Produto criado com sucesso'
			)

			queryClient.invalidateQueries({
				queryKey: ['products'],
			})
		},
	})

	return addProduct
}
