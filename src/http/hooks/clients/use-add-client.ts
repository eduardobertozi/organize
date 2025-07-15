import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { createClient } from '@/http/actions/clients/create-client'
import type { FormAddClientData } from '@/schemas/add-client-schema'

export const useAddClient = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const addClient = useMutation({
		mutationFn: async (data: FormAddClientData) => {
			await createClient(data)
		},
		onSuccess: () => {
			toggle()
			toast.success('Cliente adicionado com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['clients', 'clients-options'],
			})
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return addClient
}
