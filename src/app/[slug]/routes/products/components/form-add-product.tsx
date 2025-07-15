'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, DollarSignIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { InputIcon } from '@/components/ui/extensions/input-icon'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAddProduct } from '@/http/hooks/products/use-add-product'
import {
	type FormAddProductData,
	formAddProductSchema,
} from '@/schemas/add-product-schema'
import type { Product } from '@/types/product'

type FormAddProductProps = {
	product?: Product | null
}

export const FormAddProduct: React.FC<FormAddProductProps> = ({
	product = null,
}) => {
	const form = useForm<FormAddProductData>({
		defaultValues: {
			description: product?.description || '',
			coast: product?.coast,
			quantity: product?.quantity,
		},
		resolver: zodResolver(formAddProductSchema),
	})
	const addProduct = useAddProduct(product?.id)

	return (
		<Form {...form}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit((data) => addProduct.mutateAsync(data))}
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
					name="coast"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor</FormLabel>
							<FormControl>
								<InputIcon
									{...field}
									icon={DollarSignIcon}
									side="left"
									step="1"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="quantity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quantidade</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="mt-2 w-full bg-indigo-900 text-white transition hover:bg-indigo-800"
					disabled={addProduct.isSuccess || addProduct.isPending}
					type="submit"
				>
					{addProduct.isSuccess ? (
						<span className="flex items-center">
							Salvo com sucesso <CheckIcon className="ml-2 h-4 w-4" />
						</span>
					) : (
						<span>{addProduct.isPending ? 'Salvando...' : 'Salvar'}</span>
					)}
				</Button>
			</form>
		</Form>
	)
}
