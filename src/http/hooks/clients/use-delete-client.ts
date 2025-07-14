import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'

export const useDeleteClient = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const deleteClient = useMutation({
		mutationFn: async (clientId: string) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return clientId
		},
		onSuccess: (clientId) => {
			console.log(`deleting ${clientId}`)
			toggle()
			toast.success('Cliente excluído com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['clients', 'clients-options'],
			})
		},
	})

	return deleteClient
}
