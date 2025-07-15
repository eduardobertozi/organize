'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/database'
import { schema } from '@/db/schema'
import {
	type FormAddProductData,
	formAddProductSchema,
} from '@/schemas/add-product-schema'
import { getUser } from '../auth/get-user'

/**
 * @param data - Dados do produto
 * @param id - ID do produto
 */
export async function updateProduct(data: FormAddProductData, id: string) {
	const user = await getUser()

	if (!user) {
		throw new Error('Não autorizado')
	}

	const validData = formAddProductSchema.safeParse(data)

	if (!validData.success) {
		throw new Error(validData.error.message)
	}

	try {
		await db.update(schema.product).set(data).where(eq(schema.product.id, id))
	} catch (err) {
		console.error(err)
		throw new Error('Erro ao atualizar produto')
	}
}
