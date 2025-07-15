'use sever'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import {
	type FormAddServantData,
	formAddServantSchema,
} from '@/schemas/add-servant-schema'
import { getUser } from '../auth/get-user'

/**
 * @param data - Dados do serviço
 * @param id - ID do serviço
 */
export async function updateServant(data: FormAddServantData, id: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const validData = formAddServantSchema.safeParse(data)

	if (!validData.success) {
		throw new Error(validData.error.message)
	}

	try {
		await db.update(schema.servant).set(data).where(eq(schema.servant.id, id))
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao atualizar serviço')
	}
}
