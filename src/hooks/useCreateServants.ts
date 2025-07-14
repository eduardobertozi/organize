import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { FormAddSaleData } from '@/app/[slug]/_routes/sales/form-add-sale'
import { useGlobalStore } from '@/store/global'

export const useCreateServants = () => {
	const { setIsOpenSheet } = useGlobalStore()

	const addSale = useMutation({
		mutationFn: async (data: FormAddSaleData) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return data
		},
		onSuccess: (data) => {
			console.log(data)
			toast.success('Venda adicionada com sucesso')
			setIsOpenSheet(false)
		},
	})

	return addSale
}
