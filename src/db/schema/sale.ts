import { relations } from 'drizzle-orm'
import {
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core'
import { user } from './auth'
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
	sellerId: text('seller_id').references(() => user.id),
})

export const salesRelations = relations(sale, ({ many }) => ({
	saleServants: many(saleServants),
}))
