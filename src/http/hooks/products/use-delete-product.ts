import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { deleteProduct } from '@/http/actions/products/delete-product'

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const response = useMutation({
		mutationFn: async (productId: string) => {
			await deleteProduct(productId)
		},
		onSuccess: (productId) => {
			console.log(`deleting ${productId}`)
			toggle()
			toast.success('Produto excluído com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['products'],
			})
		},
	})

	return response
}
