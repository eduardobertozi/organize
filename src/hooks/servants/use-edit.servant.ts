import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { FormAddServantData } from '@/app/[slug]/_routes/servants/form-add-servant'
import { useSheetToggle } from '@/components/ui/sheet'

export const useAEditServant = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const addServant = useMutation({
		mutationFn: async (data: FormAddServantData) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return data
		},
		onSuccess: (data) => {
			console.log(data)
			toggle()
			toast.success('Serviço editado com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['servants'],
			})
		},
	})

	return addServant
}
