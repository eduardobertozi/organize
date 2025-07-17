'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

export async function fetchSaleServants(saleId: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	if (!saleId) {
		return []
	}

	try {
		const saleServants = await db
			.select()
			.from(schema.saleServants)
			.where(eq(schema.saleServants.saleId, saleId))

		return saleServants
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao buscar serviços vinculados a venda')
	}
}
