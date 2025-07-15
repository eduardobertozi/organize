'use server'

import { db } from '@/db/database'
import { sale } from '@/db/schema/sale'
import {
	type FormAddSaleData,
	formAddSaleSchema,
} from '@/schemas/add-sale-schema'
import { getUser } from '../auth/get-user'

export async function createSale(data: FormAddSaleData) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const validData = formAddSaleSchema.safeParse(data)

	if (!validData.success) {
		throw new Error(validData.error.message)
	}

	try {
		await db.insert(sale).values(data)
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao criar venda')
	}
}
