'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, DollarSignIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { useAddProduct } from '@/hooks/products/use-add-product'
import type { Product } from '@/types/product'

const formAddProductSchema = z.object({
	description: z.string().min(1, 'Defina uma descrição para o produto'),
	coast: z.number().min(1, 'Defina um valor para o produto'),
	quantity: z.number().min(1, 'Defina uma quantidade para o produto'),
})

export type FormAddProductData = z.infer<typeof formAddProductSchema>

type FormAddProductProps = {
	product?: Product | null
}

export const FormAddProduct: React.FC<FormAddProductProps> = ({
	product = null,
}) => {
	const form = useForm<FormAddProductData>({
		defaultValues: {
			description: product?.description || '',
			coast: product?.coast || 0,
			quantity: product?.quantity || 0,
		},
		resolver: zodResolver(formAddProductSchema),
	})
	const addProduct = useAddProduct()

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
