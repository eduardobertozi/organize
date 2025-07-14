import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { createSale } from '@/http/actions/sales/create-sale'
import type { FormAddSaleData } from '@/schemas/add-sale-schema'

export const useAddSale = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const addSale = useMutation({
		mutationFn: async (data: FormAddSaleData) => {
			await createSale(data)
		},
		onSuccess: () => {
			toggle()
			toast.success('Venda adicionada com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['sales', 'sales-options'],
			})
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return addSale
}
