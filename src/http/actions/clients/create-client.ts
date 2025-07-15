'use server'

import { db } from '@/db/database'
import { client } from '@/db/schema/client'
import {
	type FormAddClientData,
	formAddClientSchema,
} from '@/schemas/add-client-schema'
import { getUser } from '../auth/get-user'

export async function createClient(data: FormAddClientData) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const validData = formAddClientSchema.safeParse(data)

	if (!validData.success) {
		throw new Error(validData.error.message)
	}

	try {
		await db.insert(client).values(data)
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao criar cliente')
	}
}
