import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'

export const useDeleteSale = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const deleteSale = useMutation({
		mutationFn: async (saleId: string) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return saleId
		},
		onSuccess: (saleId) => {
			console.log(`deleting ${saleId}`)
			toggle()
			toast.success('Venda excluída com sucesso')

			queryClient.invalidateQueries({ queryKey: ['sales', 'sales-options'] })
		},
	})

	return deleteSale
}
