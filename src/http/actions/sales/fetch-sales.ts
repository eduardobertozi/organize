'use server'

import { desc, eq, ilike } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

type FetchSalesParams = {
	search: string
	page: number
}

export async function fetchSales({ search, page }: FetchSalesParams) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const { clients, sales } = schema

	const data = await db
		.select({
			sale: {
				...sales,
			},
			name: clients.name,
		})
		.from(sales)
		.leftJoin(clients, eq(sales.clientId, clients.id))
		.where(ilike(clients.name, `%${search}%`))
		.limit(10)
		.offset((page - 1) * 10)
		.orderBy(desc(sales.date))

	return data.map((raw) => ({
		...raw.sale,
		name: `	${raw.name}`,
	}))
}
