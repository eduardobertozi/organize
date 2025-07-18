'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import {
	type FormAddClientData,
	formAddClientSchema,
} from '@/schemas/add-client-schema'
import { getUser } from '../auth/get-user'

/**
 * @param data - Dados do cliente
 * @param id - ID do cliente
 */
export async function updateClient(data: FormAddClientData, id: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const validData = formAddClientSchema.safeParse(data)

	if (!validData.success) {
		throw new Error(validData.error.message)
	}

	try {
		await db.update(schema.client).set(data).where(eq(schema.client.id, id))
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao atualizar cliente')
	}
}
