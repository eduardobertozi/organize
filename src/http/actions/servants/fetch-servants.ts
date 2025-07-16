'use server'

import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

export async function fetchServants() {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const servants = await db
		.select()
		.from(schema.servant)
		.orderBy(schema.servant.description)

	return servants
}
