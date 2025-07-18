import { z } from 'zod'
import { currencySchema } from './currency-schema'

export const durationOptions = [30, 45, 60, 90]

export const formAddServantSchema = z.object({
	description: z.string().min(1, 'Defina uma descrição para o serviço'),
	value: currencySchema('Defina um valor para o serviço').refine((value) => {
		return value > 1000
	}, 'Defina um valor a partir de R$10,00'),
	duration: z.coerce
		.number()
		.transform((value) => Number(value))
		.refine(
			(duration) => durationOptions.includes(duration),
			'Duração inválida'
		),
	products: z.array(z.uuid()),
})

export type FormAddServantData = z.infer<typeof formAddServantSchema>
