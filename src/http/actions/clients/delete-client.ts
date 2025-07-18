'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

/**
 * @param id - Id do cliente
 */
export async function deleteClient(id: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	try {
		await db.delete(schema.client).where(eq(schema.client.id, id))
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao deletar cliente')
	}
}
