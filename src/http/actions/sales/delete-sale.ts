'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

/**
 * @param id - Id da venda
 */
export async function deleteSale(id: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	try {
		await db.delete(schema.sale).where(eq(schema.sale.id, id))
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao deletar serviço')
	}
}
