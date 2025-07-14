'use server'

import { and, between, count, eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { sales } from '@/db/schema/sale'
import { dayjs } from '@/lib/dayjs'
import { getUser } from '../auth/get-user'

export async function getSalesCount() {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const startOfWeek = dayjs().startOf('week').toDate()
	const endOfWeek = dayjs().endOf('week').toDate()

	return await db
		.select({
			count: count(),
		})
		.from(sales)
		.where(
			and(
				eq(sales.status, 'completed'),
				between(sales.date, startOfWeek, endOfWeek)
			)
		)
}
