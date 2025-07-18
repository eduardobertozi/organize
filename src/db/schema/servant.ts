import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { servantProducts } from './servant-products'

export const servant = pgTable('servant', {
	id: uuid().primaryKey().defaultRandom(),
	description: text().notNull(),
	value: integer().notNull(),
	duration: integer().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const servantRelations = relations(servant, ({ many }) => ({
	servantProducts: many(servantProducts),
}))
