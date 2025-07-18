'use server'

import { db } from '@/db/database'
import { schema } from '@/db/schema'
import {
	type FormAddSaleData,
	formAddSaleSchema,
} from '@/schemas/add-sale-schema'
import { getUser } from '../auth/get-user'

export async function createSale(data: FormAddSaleData) {
	const session = await getUser()

	if (!session) {
		throw new Error('Não autorizado')
	}

	const validData = formAddSaleSchema.safeParse(data)

	if (!validData.success) {
		throw new Error(validData.error.message)
	}

	try {
		const sale = await db
			.insert(schema.sale)
			.values({
				amount: data.amount,
				date: data.date,
				status: data.status,
				clientId: data.clientId,
				sellerId: session.user.id,
			})
			.returning()
		await db.insert(schema.saleServants).values(
			data.servants.map((servant) => ({
				saleId: sale[0].id,
				servantId: servant,
			}))
		)
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao criar venda')
	}
}
