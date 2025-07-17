import { z } from 'zod'
import { currencySchema } from './currency-schema'

const isDateInTheFuture = (date: Date) => {
	return date.getTime() <= Date.now()
}

export const formAddSaleSchema = z.object({
	servants: z.array(z.uuid()).min(1, 'Adicione pelo menos um serviço'),
	clientId: z.uuid().min(1, 'Selecione um cliente'),
	date: z
		.date({ error: 'Adicione uma data válida' })
		.refine(isDateInTheFuture, 'Adicione uma data válida'),
	amount: currencySchema('Defina um valor para a venda'),
	status: z.enum(['pending', 'completed', 'cancelled', 'awaiting']),
})

export type FormAddSaleData = z.infer<typeof formAddSaleSchema>
