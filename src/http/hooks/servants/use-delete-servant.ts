import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'

export const useDeleteServant = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const deleteServant = useMutation({
		mutationFn: async (servantId: string) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return servantId
		},
		onSuccess: (servantId) => {
			console.log(`deleting ${servantId}`)
			toggle()
			toast.success('Serviço excluído com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['servants', 'servants-options'],
			})
		},
	})

	return deleteServant
}
