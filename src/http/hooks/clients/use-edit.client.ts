import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { FormAddClientData } from '@/app/[slug]/_routes/clients/form-add-client'
import { useSheetToggle } from '@/components/ui/sheet'

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
