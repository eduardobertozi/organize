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
	const session = await getUser()

	if (!session) {
		throw new Error('Não autorizado')
	}

	const { client, sale, user } = schema
	const total = await db.$count(sale)

	const data = await db
		.select({
			sale: {
				...sale,
			},
			name: client.name,
			seller: user.name,
		})
		.from(sale)
		.leftJoin(client, eq(sale.clientId, client.id))
		.leftJoin(user, eq(sale.sellerId, user.id))
		.where(ilike(client.name, `%${search}%`))
		.limit(10)
		.offset((page - 1) * 10)
		.orderBy(desc(sale.date))

	return {
		sales: data.map((raw) => ({
			...raw.sale,
			name: raw.name,
			seller: raw.seller,
		})),
		total,
	}
}
