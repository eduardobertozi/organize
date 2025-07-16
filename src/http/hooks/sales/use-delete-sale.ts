import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { deleteSale } from '@/http/actions/sales/delete-sale'

export const useDeleteSale = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const response = useMutation({
		mutationFn: async (saleId: string) => {
			await deleteSale(saleId)
		},
		onSuccess: () => {
			toggle()
			toast.success('Venda excluída com sucesso')

			queryClient.invalidateQueries({ queryKey: ['sales'] })
		},
	})

	return response
}
