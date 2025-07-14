import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { FormAddSaleData } from '@/app/[slug]/_routes/sales/form-add-sale'

export const useCreateServants = () => {
	const addSale = useMutation({
		mutationFn: async (data: FormAddSaleData) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return data
		},
		onSuccess: () => {
			toast.success('Venda adicionada com sucesso')
		},
	})

	return addSale
}
