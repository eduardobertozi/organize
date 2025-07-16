import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import { deleteServant } from '@/http/actions/servants/delete-servant'

export const useDeleteServant = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const response = useMutation({
		mutationFn: async (servantId: string) => {
			await deleteServant(servantId)
		},
		onSuccess: () => {
			toggle()
			toast.success('Serviço excluído com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['servants'],
			})
		},
	})

	return response
}
