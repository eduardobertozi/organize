import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { client } from './client'
import { saleServants } from './sale-servants'

export const saleStatus = pgEnum('sale_status', [
	'pending',
	'completed',
	'cancelled',
	'awaiting',
])

export const sale = pgTable('sale', {
	id: uuid().primaryKey().defaultRandom(),
	amount: integer().notNull(),
	date: timestamp('date').notNull(),
	status: saleStatus('status').notNull(),
	clientId: uuid('client_id').references(() => client.id),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const salesRelations = relations(sale, ({ many }) => ({
	saleServants: many(saleServants),
}))
