'use server'

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
		const servant = await db.insert(schema.servant).values(data).returning()
		await db.insert(schema.servantProducts).values(
			data.products.map((product) => ({
				servantId: servant[0].id,
				productId: product,
			}))
		)
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao criar serviço')
	}
}
