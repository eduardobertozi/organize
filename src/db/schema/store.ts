import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { suppliers } from './supplier'

export const store = pgTable('store', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	supplierId: uuid().references(() => suppliers.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
})
