import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { supplier } from './supplier'

export const product = pgTable('product', {
	id: uuid().primaryKey().defaultRandom(),
	description: text().notNull(),
	coast: integer().notNull(),
	quantity: integer(),
	updatedAt: timestamp().defaultNow().notNull(),
	supplierId: uuid().references(() => supplier.id),
})
