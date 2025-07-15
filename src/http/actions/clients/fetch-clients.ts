'use server'

import { ilike } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/db/database'
import { clients } from '@/db/schema/client'
import { getUser } from '../auth/get-user'

const searchSchema = z.string().optional().default('')

export async function fetchClients(search: z.infer<typeof searchSchema>) {
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
