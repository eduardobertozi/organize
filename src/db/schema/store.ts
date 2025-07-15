import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { supplier } from './supplier'

export const store = pgTable('store', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	supplierId: uuid().references(() => supplier.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
})
