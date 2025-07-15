'use server'

import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

export async function fetchProducts() {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	try {
		const data = await db
			.select()
			.from(schema.product)
			.orderBy(schema.product.description)

		return data
	} catch (err) {
		console.error(err)
		throw new Error('Não foi possível buscar os produtos')
	}
}
