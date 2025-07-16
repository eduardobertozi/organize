import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { createSale } from '@/http/actions/sales/create-sale'
import { updateSale } from '@/http/actions/sales/update-sale'
import type { FormAddSaleData } from '@/schemas/add-sale-schema'

export const useAddSale = (id?: string) => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const response = useMutation({
		mutationFn: async (data: FormAddSaleData) => {
			if (id) {
				await updateSale(data, id)
				return
			}
			await createSale(data)
		},
		onSuccess: () => {
			toggle()
			toast.success(
				id ? 'Venda atualizada com sucesso' : 'Venda adicionada com sucesso'
			)

			queryClient.invalidateQueries({
				queryKey: ['sales'],
			})
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return response
}
