'use server'

import { ilike } from 'drizzle-orm'
import { db } from '@/db/database'
import { clients } from '@/db/schema/client'
import { getUser } from '../auth/get-user'

export async function fetchClients(search: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	if (search.length === 0) {
		return []
	}

	try {
		const data = await db
			.select()
			.from(clients)
			.where(ilike(clients.name, `%${search}%`))
		return data
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao buscar clientes')
	}
}
