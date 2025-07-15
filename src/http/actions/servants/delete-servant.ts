'use sever'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

/**
 * @param id - Id do serviço
 */
export async function deleteServant(id: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	try {
		await db.delete(schema.servants).where(eq(schema.servants.id, id))
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao deletar serviço')
	}
}
