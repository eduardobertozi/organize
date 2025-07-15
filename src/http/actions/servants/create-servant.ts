'use sever'

import { db } from '@/db/database'
import { schema } from '@/db/schema'
import {
	type FormAddServantData,
	formAddServantSchema,
} from '@/schemas/add-servant-schema'
import { getUser } from '../auth/get-user'

export async function createServant(data: FormAddServantData) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const validData = formAddServantSchema.safeParse(data)

	if (!validData.success) {
		throw new Error(validData.error.message)
	}

	try {
		await db.insert(schema.servant).values(data)
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao criar serviço')
	}
}
