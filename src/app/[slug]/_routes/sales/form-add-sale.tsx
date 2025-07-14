'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DollarSignIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MultiSelector } from '@/components/multi-selector'
import { Button } from '@/components/ui/button'
import { DateSelector } from '@/components/ui/date-selector'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { InputIcon } from '@/components/ui/input-icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreateServants } from '@/hooks/useCreateServants'
import { useFetchClients } from '@/hooks/useFetchClients'
import { useFetchServants } from '@/hooks/useFetchServants'
import { SelectClient } from './select-client'

const formAddSaleSchema = z.object({
	servantId: z.array(z.uuid()).min(1, 'Adicione pelo menos um serviço'),
	cliendId: z.string().min(1, 'Selecione um cliente'),
	date: z.date().min(new Date(), 'Adicione uma data válida'),
	amount: z.coerce.number().min(1, 'Defina um valor para a venda'),
	status: z.enum(['pending', 'completed', 'canceled', 'awaiting']),
})

export type FormAddSaleData = z.infer<typeof formAddSaleSchema>

export const FormAddSale = () => {
	const form = useForm<FormAddSaleData>({
		resolver: zodResolver(formAddSaleSchema),
		defaultValues: {
			amount: 0,
			date: new Date(),
			status: 'pending',
			cliendId: '',
			servantId: [],
		},
	})

	const servants = useFetchServants()
	const clients = useFetchClients()
	const addSale = useCreateServants()

	async function handleSubmit(data: FormAddSaleData) {
		const result = await addSale.mutateAsync(data)
		console.log(result)
	}

	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					control={form.control}
					name="cliendId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cliente</FormLabel>
							<FormControl>
								{clients.isLoading ? (
									<Skeleton className="h-10 w-full" />
								) : (
									<SelectClient
										items={clients.data ?? []}
										onSelect={field.onChange}
									/>
								)}
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="servantId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Serviço</FormLabel>
							<FormControl>
								<div>
									{servants.isLoading ? (
										<Skeleton className="h-10 w-full" />
									) : (
										<MultiSelector
											items={servants.data}
											onChangeValue={field.onChange}
										/>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Agendado para:</FormLabel>
							<FormControl>
								<DateSelector
									defaultDate={field.value}
									onChangeDate={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor</FormLabel>
							<FormControl>
								<InputIcon
									{...field}
									icon={DollarSignIcon}
									side="left"
									step="1"
									type="number"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="mt-2 w-full bg-indigo-900 text-white transition hover:bg-indigo-800"
					type="submit"
				>
					Salvar
				</Button>
			</form>
		</Form>
	)
}
