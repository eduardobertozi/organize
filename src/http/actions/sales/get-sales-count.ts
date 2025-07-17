'use server'

import { and, between, count, eq, sum } from 'drizzle-orm'
import { db } from '@/db/database'
import { sale } from '@/db/schema/sale'
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
			value: sum(sale.amount),
			count: count(),
		})
		.from(sale)
		.where(
			and(
				eq(sale.status, 'completed'),
				between(sale.date, startOfWeek, endOfWeek)
			)
		)
}
