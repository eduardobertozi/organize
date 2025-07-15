import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'

export const supplier = pgTable('supplier', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	documentId: text('document_id').notNull(),
	address: text(),
	phone: text(),
	email: text(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	userId: text('user_id').references(() => user.id),
})
