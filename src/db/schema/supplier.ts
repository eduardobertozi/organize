import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'

export const suppliers = pgTable('supplier', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	documentId: text().notNull(),
	address: text(),
	phone: text(),
	email: text(),
	updatedAt: timestamp().defaultNow().notNull(),
	userId: text('user_id').references(() => user.id),
})
