'use server'

import { desc, ilike } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { client } from '@/db/schema/client'
import { getUser } from '../auth/get-user'

type FetchClientsParams = {
	search: string
	page: number
}

export async function fetchClients({ search, page }: FetchClientsParams) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	try {
		const total = await db.$count(schema.client)
		const clients = await db
			.select()
			.from(client)
			.where(ilike(schema.client.name, `%${search}%`))
			.limit(10)
			.offset((page - 1) * 10)
			.orderBy(desc(schema.client.name))

		return {
			clients,
			total,
		}
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao buscar clientes')
	}
}
