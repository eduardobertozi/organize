import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { createClient } from '@/http/actions/clients/create-client'
import { updateClient } from '@/http/actions/clients/update-client'
import type { FormAddClientData } from '@/schemas/add-client-schema'

export const useAddClient = (id?: string) => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const addClient = useMutation({
		mutationFn: async (data: FormAddClientData) => {
			if (id) {
				await updateClient(data, id)
				return
			}
			await createClient(data)
		},
		onSuccess: () => {
			toggle()
			toast.success(
				id ? 'Cliente atualizado com sucesso' : 'Cliente adicionado com sucesso'
			)

			queryClient.invalidateQueries({
				queryKey: ['clients'],
			})
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return addClient
}
