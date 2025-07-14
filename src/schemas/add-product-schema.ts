import { z } from 'zod'

export const formAddProductSchema = z.object({
	description: z.string().min(1, 'Defina uma descrição para o produto'),
	coast: z.number().min(1, 'Defina um valor para o produto'),
	quantity: z.number().min(1, 'Defina uma quantidade para o produto'),
})

export type FormAddProductData = z.infer<typeof formAddProductSchema>
