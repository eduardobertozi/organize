import { pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { user } from './auth'

export const clients = pgTable('client', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	whatsapp: text().notNull(),
	userId: text('user_id').references(() => user.id),
})
