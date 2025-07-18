'use server'

import { count, ilike } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import { getUser } from '../auth/get-user'

type FetchProductsParams = {
	search: string
	page: number
}

export async function fetchProducts({ search, page }: FetchProductsParams) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	try {
		const total = await db.$count(schema.product)

		const products = await db
			.select()
			.from(schema.product)
			.where(ilike(schema.product.description, `%${search}%`))
			.limit(10)
			.offset((page - 1) * 10)
			.orderBy(schema.product.description)

		return {
			products,
			total,
		}
	} catch (err) {
		console.error(err)
		throw new Error('Não foi possível buscar os produtos')
	}
}
