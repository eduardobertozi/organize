import { z } from 'zod'
import { currencySchema } from './currency-schema'

export const formAddServantSchema = z.object({
	description: z.string().min(1, 'Defina uma descrição para o serviço'),
	value: currencySchema('Defina um valor para o serviço'),
	products: z.array(z.uuid()),
})

export type FormAddServantData = z.infer<typeof formAddServantSchema>
