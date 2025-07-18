import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { deleteClient } from '@/http/actions/clients/delete-client'

export const useDeleteClient = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const response = useMutation({
		mutationFn: async (clientId: string) => {
			await deleteClient(clientId)
		},
		onSuccess: () => {
			toast.success('Cliente excluído com sucesso')
			toggle()

			queryClient.invalidateQueries({
				queryKey: ['clients'],
			})
		},
	})

	return response
}
