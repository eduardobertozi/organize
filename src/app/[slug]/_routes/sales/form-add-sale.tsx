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
import { useCreateSale } from '@/hooks/useCreateSale'
import { useFetchClients } from '@/hooks/useFetchClients'
import { useFetchServants } from '@/hooks/useFetchServants'
import type { Sale } from '@/types/sale'

const formAddSaleSchema = z.object({
	servantId: z.array(z.uuid()).min(1, 'Adicione pelo menos um serviço'),
	cliendId: z.string().min(1, 'Selecione um cliente'),
	date: z.date().min(new Date(), 'Adicione uma data válida'),
	amount: z.coerce.number().min(1, 'Defina um valor para a venda'),
	status: z
		.enum(['pending', 'completed', 'canceled', 'awaiting'])
		.default('pending'),
})

export type FormAddSaleData = z.infer<typeof formAddSaleSchema>

type FormAddSaleProps = {
	sale?: Sale | null
}

export const FormAddSale: React.FC<FormAddSaleProps> = ({ sale = null }) => {
	const form = useForm<FormAddSaleData>({
		resolver: zodResolver(formAddSaleSchema),
		defaultValues: {
			amount: sale?.amount ?? 0,
			date: sale?.date ?? new Date(),
			status: sale?.status ?? 'pending',
			cliendId: sale?.cliendId ?? '',
			servantId: sale?.servantId ?? [],
		},
	})

	const clients = useFetchClients()
	const servants = useFetchServants()
	const addSale = useCreateSale()

	return (
		<Form {...form}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit(addSale.mutateAsync)}
			>
				<FormField
					control={form.control}
					name="cliendId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cliente</FormLabel>
							<FormControl>
								<SelectItemDialog
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
