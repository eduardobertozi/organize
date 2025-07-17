'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import {
	type FormAddSaleData,
	formAddSaleSchema,
} from '@/schemas/add-sale-schema'
import { getUser } from '../auth/get-user'

/**
 * @param data - Dados da venda
 * @param id - ID da venda
 */
export async function updateSale(data: FormAddSaleData, id: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const validData = formAddSaleSchema.safeParse(data)

	if (!validData.success) {
		throw new Error(validData.error.message)
	}

	try {
		const sale = await db
			.update(schema.sale)
			.set({
				amount: data.amount,
				date: data.date,
				status: data.status,
			})
			.where(eq(schema.sale.id, id))
			.returning()

		await db
			.delete(schema.saleServants)
			.where(eq(schema.saleServants.saleId, id))

		await db.insert(schema.saleServants).values(
			data.servants.map((servant) => ({
				saleId: sale[0].id,
				servantId: servant,
			}))
		)
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao atualizar serviço')
	}
}
