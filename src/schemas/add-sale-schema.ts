import { z } from 'zod'
import { currencySchema } from './currency-schema'

export const formAddSaleSchema = z.object({
	servants: z.array(z.uuid()).min(1, 'Adicione pelo menos um serviço'),
	clientId: z.uuid().min(1, 'Selecione um cliente'),
	date: z.date().min(new Date(), 'Adicione uma data válida'),
	amount: currencySchema('Defina um valor para a venda'),
	status: z.enum(['pending', 'completed', 'cancelled', 'awaiting']),
})

export type FormAddSaleData = z.infer<typeof formAddSaleSchema>
