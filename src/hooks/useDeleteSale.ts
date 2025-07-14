import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteSale = () => {
	const deleteSale = useMutation({
		mutationFn: async (saleId: string) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return saleId
		},
		onSuccess: (saleId) => {
			console.log(`deleting ${saleId}`)
			toast.success('Venda excluída com sucesso')
		},
	})

	return deleteSale
}
