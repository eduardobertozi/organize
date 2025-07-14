'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, DollarSignIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { InputIcon } from '@/components/ui/extensions/input-icon'
import { MultiSelector } from '@/components/ui/extensions/multi-selector'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchProductsOptions } from '@/http/hooks/products/use-fetch-products'
import { useAddServant } from '@/http/hooks/servants/use-add-servant'
import type { Servant } from '@/types/servant'

const formAddServantSchema = z.object({
	description: z.string().min(1, 'Defina uma descrição para o serviço'),
	value: z.number().min(1, 'Defina um valor para o serviço'),
	products: z.array(z.uuid()),
})

export type FormAddServantData = z.infer<typeof formAddServantSchema>

type FormAddServantProps = {
	servant?: Servant | null
}

export const FormAddServant: React.FC<FormAddServantProps> = ({
	servant = null,
}) => {
	const form = useForm<FormAddServantData>({
		defaultValues: {
			description: servant?.description || '',
			value: servant?.value || 0,
			products: servant?.products || [],
		},
		resolver: zodResolver(formAddServantSchema),
	})
	const products = useFetchProductsOptions()
	const addServant = useAddServant()

	return (
		<Form {...form}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit((data) => addServant.mutateAsync(data))}
			>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="products"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Productos</FormLabel>
							<FormControl>
								<div>
									{products.isLoading ? (
										<Skeleton className="h-10 w-full" />
									) : (
										<MultiSelector
											items={products.data}
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
					name="value"
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
				<Button
					className="mt-2 w-full bg-indigo-900 text-white transition hover:bg-indigo-800"
					disabled={addServant.isSuccess || addServant.isPending}
					type="submit"
				>
					{addServant.isSuccess ? (
						<span className="flex items-center">
							Salvo com sucesso <CheckIcon className="ml-2 h-4 w-4" />
						</span>
					) : (
						<span>{addServant.isPending ? 'Salvando...' : 'Salvar'}</span>
					)}
				</Button>
			</form>
		</Form>
	)
}
