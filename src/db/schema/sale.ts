import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { clients } from './client'
import { saleServants } from './sale-servants'

export const saleStatus = pgEnum('sale_status', [
	'pending',
	'completed',
	'cancelled',
	'awaiting',
])

export const sales = pgTable('sale', {
	id: uuid().primaryKey().defaultRandom(),
	amount: integer().notNull(),
	date: timestamp('date').notNull(),
	status: saleStatus('status').notNull(),
	clientId: uuid().references(() => clients.id),
	updatedAt: timestamp().defaultNow().notNull(),
})

export const salesRelations = relations(sales, ({ many }) => ({
	saleServants: many(saleServants),
}))
