'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

/**
 * @param id - Id do produto
 */
export async function deleteProduct(id: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	try {
		await db.delete(schema.product).where(eq(schema.product.id, id))
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao deletar produto')
	}
}
