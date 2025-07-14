import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { FormAddSaleData } from '@/app/[slug]/routes/sales/form-add-sale'
import { useSheetToggle } from '@/components/ui/sheet'

export const useAddSale = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const addSale = useMutation({
		mutationFn: async (data: FormAddSaleData) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return data
		},
		onSuccess: (data) => {
			console.log(data)
			toggle()
			toast.success('Venda adicionada com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['sales', 'sales-options'],
			})
		},
	})

	return addSale
}
