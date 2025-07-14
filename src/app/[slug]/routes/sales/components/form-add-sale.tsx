'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, DollarSignIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { DateSelector } from '@/components/ui/extensions/date-selector'
import { InputIcon } from '@/components/ui/extensions/input-icon'
import { MultiSelector } from '@/components/ui/extensions/multi-selector'
import { SelectItemDialog } from '@/components/ui/extensions/select-item-dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchClients } from '@/http/hooks/clients/use-fetch-clients'
import { useAddSale } from '@/http/hooks/sales/use-add-sale'
import { useFetchServantsOptions } from '@/http/hooks/servants/use-fetch-servants'
import type { Sale } from '@/types/sale'
import { AddClient } from '../../clients/components/add-client'
import { StatusField } from './status-field'

const formAddSaleSchema = z.object({
	servantId: z.array(z.uuid()).min(1, 'Adicione pelo menos um serviço'),
	clientId: z.uuid().min(1, 'Selecione um cliente'),
	date: z.date().min(new Date(), 'Adicione uma data válida'),
	amount: z.number().min(1, 'Defina um valor para a venda'),
	status: z.enum(['pending', 'completed', 'cancelled', 'awaiting']),
})

export type FormAddSaleData = z.infer<typeof formAddSaleSchema>

type FormAddSaleProps = {
	sale?: Sale | null
}

export const FormAddSale: React.FC<FormAddSaleProps> = ({ sale = null }) => {
	const form = useForm<FormAddSaleData>({
		defaultValues: {
			amount: sale?.amount || 0,
			clientId: sale?.clientId || '',
			servantId: sale?.servantId || [],
			date: sale?.date || new Date(),
			status: sale?.status || 'pending',
		},
		resolver: zodResolver(formAddSaleSchema),
	})

	const isVisible = sale !== null

	const clients = useFetchClients()
	const servants = useFetchServantsOptions()
	const addSale = useAddSale()

	return (
		<Form {...form}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit((data) => addSale.mutateAsync(data))}
			>
				<FormField
					control={form.control}
					name="clientId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cliente</FormLabel>
							<FormControl>
								<SelectItemDialog
									addNewItemElement={<AddClient />}
									items={clients.data ?? []}
									onSelect={field.onChange}
								/>
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
									onChange={(e) => field.onChange(+e.target.value)}
									side="left"
									step="1"
									type="number"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<StatusField form={form} isVisible={isVisible} />
				<Button
					className="mt-2 w-full bg-indigo-900 text-white transition hover:bg-indigo-800"
					disabled={addSale.isSuccess || addSale.isPending}
					type="submit"
				>
					{addSale.isSuccess ? (
						<span className="flex items-center">
							Salvo com sucesso <CheckIcon className="ml-2 h-4 w-4" />
						</span>
					) : (
						<span>{addSale.isPending ? 'Salvando...' : 'Salvar'}</span>
					)}
				</Button>
			</form>
		</Form>
	)
}
