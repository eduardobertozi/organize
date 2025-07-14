'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon } from 'lucide-react'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAddClient } from '@/http/hooks/clients/use-add-client'
import type { Client } from '@/types/client'

const formAddClientSchema = z.object({
	name: z.string().min(1, 'Defina o nome do cliente'),
	whatsapp: z.string().min(1, 'Defina o whatsapp do cliente'),
})

export type FormAddClientData = z.infer<typeof formAddClientSchema>

type FormAddClientProps = {
	client?: Client | null
}

export const FormAddClient: React.FC<FormAddClientProps> = ({
	client = null,
}) => {
	const form = useForm<FormAddClientData>({
		defaultValues: {
			name: client?.name || '',
			whatsapp: client?.whatsapp || '479',
		},
		resolver: zodResolver(formAddClientSchema),
	})

	const addClient = useAddClient()

	return (
		<Form {...form}>
			<form
				className="space-y-4"
				id={useId()}
				onSubmit={form.handleSubmit((data) => addClient.mutateAsync(data))}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="whatsapp"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Whatsapp / Celular</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="mt-2 w-full bg-indigo-900 text-white transition hover:bg-indigo-800"
					disabled={addClient.isSuccess || addClient.isPending}
					type="submit"
				>
					{addClient.isSuccess ? (
						<span className="flex items-center">
							Salvo com sucesso <CheckIcon className="ml-2 h-4 w-4" />
						</span>
					) : (
						<span>{addClient.isPending ? 'Salvando...' : 'Salvar'}</span>
					)}
				</Button>
			</form>
		</Form>
	)
}
