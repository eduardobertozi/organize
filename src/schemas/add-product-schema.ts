import { z } from 'zod/v3'

export const formAddProductSchema = z.object({
	description: z.string().min(1, 'Defina uma descrição para o produto'),
	coast: z.coerce.number().min(1, 'Defina um valor para o produto'),
	quantity: z.coerce.number().min(1, 'Defina o estoque do produto'),
})

export type FormAddProductData = z.infer<typeof formAddProductSchema>
