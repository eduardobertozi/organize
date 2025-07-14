import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { servantProducts } from './servant-products'

export const servants = pgTable('servant', {
	id: uuid().primaryKey().defaultRandom(),
	description: text().notNull(),
	value: integer().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const servantRelations = relations(servants, ({ many }) => ({
	servantProducts: many(servantProducts),
}))
