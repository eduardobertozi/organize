'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

export async function fetchServantProducts(servantId: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	try {
		const servantProducts = await db
			.select()
			.from(schema.servantProducts)
			.where(eq(schema.servantProducts.servantId, servantId))

		return servantProducts
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao buscar produtos vinculados ao serviço')
	}
}
