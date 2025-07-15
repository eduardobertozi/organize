import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import type { FormAddServantData } from '@/schemas/add-servant-schema'

export const useAddServant = () => {
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
			toast.success('Serviço adicionado com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['servants', 'servants-options'],
			})
		},
	})

	return addServant
}
