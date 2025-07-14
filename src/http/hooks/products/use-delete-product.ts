import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const deleteProduct = useMutation({
		mutationFn: async (productId: string) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return productId
		},
		onSuccess: (productId) => {
			console.log(`deleting ${productId}`)
			toggle()
			toast.success('Produto excluído com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['products', 'products-options'],
			})
		},
	})

	return deleteProduct
}
