import { z } from 'zod'
import { currencySchema } from './currency-schema'

export const formAddProductSchema = z.object({
	description: z.string().min(1, 'Defina uma descrição para o produto'),
	coast: currencySchema('Defina um valor para o produto'),
	quantity: z.coerce.number().min(1, 'Defina o estoque do produto'),
})

export type FormAddProductData = z.infer<typeof formAddProductSchema>
