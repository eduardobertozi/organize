import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { FormAddSaleData } from '@/app/[slug]/_routes/sales/form-add-sale'
import { useSheetContext } from '@/components/ui/extensions/sheet-closable'

export const useCreateSale = () => {
	const queryClient = useQueryClient()
	const { handleChangeOpen } = useSheetContext()

	const addSale = useMutation({
		mutationFn: async (data: FormAddSaleData) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return data
		},
		onSuccess: (data) => {
			console.log(data)
			toast.success('Venda adicionada com sucesso')
			handleChangeOpen(false)

			queryClient.invalidateQueries({
				queryKey: ['sales'],
			})
		},
	})

	return addSale
}
