'use client'

import { CheckIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { InputCurrency } from '@/components/ui/extensions/input-currency'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchProducts } from '@/http/hooks/products/use-fetch-products'
import { useAddServant } from '@/http/hooks/servants/use-add-servant'
import { useFetchServantProducts } from '@/http/hooks/servants/use-fetch-servant-products'
import { resolver } from '@/lib/zod'
import {
	durationOptions,
	type FormAddServantData,
	formAddServantSchema,
} from '@/schemas/add-servant-schema'
import type { Servant } from '@/types/servant'
import { transformToOptions } from '@/utils/data-to-options'

type FormAddServantProps = {
	servant?: Servant | null
}

export const FormAddServant: React.FC<FormAddServantProps> = ({
	servant = null,
}) => {
	const form = useForm<FormAddServantData>({
		defaultValues: {
			description: servant ? servant.description : '',
			value: servant ? servant.value / 100 : 0,
			duration: servant ? servant.duration : 30,
			products: [],
		},
		resolver: resolver(formAddServantSchema),
	})

	const products = useFetchProducts()
	const productsOptions = transformToOptions(products.data?.products ?? [], {
		label: 'description',
		value: 'id',
	})

	const servantProducts = useFetchServantProducts(servant?.id ?? '')
	const defaultProducts = productsOptions.filter((product) =>
		servantProducts.data?.some(
			(servantProduct) => servantProduct.productId === product.value
		)
	)

	const isLoadingOptions = products.isLoading || servantProducts.isLoading

	const addServant = useAddServant(servant?.id)

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
									{isLoadingOptions ? (
										<Skeleton className="h-10 w-full" />
									) : (
										<MultiSelector
											defaultValue={defaultProducts}
											items={productsOptions}
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
								<InputCurrency type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="duration"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Duração (minutos)</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={field.value.toString()}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Escolha" />
									</SelectTrigger>
									<SelectContent>
										{durationOptions.map((time, index) => (
											<SelectItem
												key={`${index}-${Date.now()}`}
												value={time.toString()}
											>
												{time} minutos
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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
