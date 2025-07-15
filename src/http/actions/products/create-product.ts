'use server'

import { db } from '@/db/database'
import { schema } from '@/db/schema'
import {
	type FormAddProductData,
	formAddProductSchema,
} from '@/schemas/add-product-schema'
import { getUser } from '../auth/get-user'

export async function createProduct(data: FormAddProductData) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const validData = formAddProductSchema.safeParse(data)

	if (!validData.success) {
		throw new Error(validData.error.message)
	}

	try {
		await db.insert(schema.product).values(data)
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao criar produto')
	}
}
