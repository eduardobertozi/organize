'use client'

import { CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DateSelector } from '@/components/ui/extensions/date-selector'
import { InputCurrency } from '@/components/ui/extensions/input-currency'
import { MultiSelector } from '@/components/ui/extensions/multi-selector'
import { SelectItemDialog } from '@/components/ui/extensions/select-item-dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import type { Sale } from '@/types/sale'
import { AddClient } from '../../clients/components/add-client'
import { useFormAddSale } from './hooks/use-form-add-sale'
import { StatusField } from './status-field'

type FormAddSaleProps = {
	sale?: Sale | null
}

export const FormAddSale: React.FC<FormAddSaleProps> = ({ sale = null }) => {
	const vm = useFormAddSale({ sale })

	return (
		<Form {...vm.form}>
			<form
				className="space-y-4"
				onSubmit={vm.form.handleSubmit((data) => vm.addSale.mutateAsync(data))}
			>
				<FormField
					control={vm.form.control}
					name="clientId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cliente</FormLabel>
							<FormControl>
								<SelectItemDialog
									addNewItemElement={<AddClient />}
									items={vm.clientsOptions}
									onSelect={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={vm.form.control}
					name="servants"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Serviços Vinculados</FormLabel>
							<FormControl>
								<div>
									{vm.isLoadingServants ? (
										<Skeleton className="h-10 w-full" />
									) : (
										<MultiSelector
											defaultValue={vm.defaultServants}
											items={vm.servantsOptions}
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
					control={vm.form.control}
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
					control={vm.form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor</FormLabel>
							<FormControl>
								<InputCurrency readOnly type="number" {...field} />
							</FormControl>
							<FormDescription>
								Calculado automaticamente a partir dos serviços
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<StatusField form={vm.form} isVisible={vm.isVisible} />
				<Button
					className="mt-2 w-full bg-indigo-900 text-white transition hover:bg-indigo-800"
					disabled={vm.addSale.isSuccess || vm.addSale.isPending}
					type="submit"
				>
					{vm.addSale.isSuccess ? (
						<span className="flex items-center">
							Salvo com sucesso <CheckIcon className="ml-2 h-4 w-4" />
						</span>
					) : (
						<span>{vm.addSale.isPending ? 'Salvando...' : 'Salvar'}</span>
					)}
				</Button>
			</form>
		</Form>
	)
}
