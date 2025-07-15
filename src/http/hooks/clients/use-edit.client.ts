import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSheetToggle } from '@/components/ui/sheet'
import type { FormAddClientData } from '@/schemas/add-client-schema'

export const useAEditClient = () => {
	const queryClient = useQueryClient()
	const { toggle } = useSheetToggle()

	const addClient = useMutation({
		mutationFn: async (data: FormAddClientData) => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return data
		},
		onSuccess: (data) => {
			console.log(data)
			toggle()
			toast.success('Cliente editado com sucesso')

			queryClient.invalidateQueries({
				queryKey: ['clients'],
			})
		},
	})

	return addClient
}
