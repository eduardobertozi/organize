import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { createServant } from '@/http/actions/servants/create-servant'
import { updateServant } from '@/http/actions/servants/update-servant'
import type { FormAddServantData } from '@/schemas/add-servant-schema'

export const useAddServant = (id?: string) => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const addServant = useMutation({
		mutationFn: async (data: FormAddServantData) => {
			if (id) {
				await updateServant(data, id)
				return id
			}

			await createServant(data)
		},
		onSuccess: () => {
			toggle()

			toast.success(
				id ? 'Serviço atualizado com sucesso' : 'Serviço criado com sucesso'
			)

			queryClient.invalidateQueries({
				queryKey: ['servants'],
			})
		},
	})

	return addServant
}
