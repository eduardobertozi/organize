import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { supplier } from './supplier'

export const product = pgTable('product', {
	id: uuid().primaryKey().defaultRandom(),
	description: text().notNull(),
	coast: integer().notNull(),
	quantity: integer(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	supplierId: uuid('supplier_id').references(() => supplier.id),
})
