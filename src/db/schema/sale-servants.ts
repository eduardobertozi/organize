import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { sales } from './sale'
import { servants } from './servant'

export const saleServants = pgTable(
	'sale_servants',
	{
		saleId: uuid()
			.notNull()
			.references(() => sales.id),
		servantId: uuid()
			.notNull()
			.references(() => servants.id),
	},
	(t) => [primaryKey({ columns: [t.saleId, t.servantId] })]
)

export const saleServantsRelations = relations(saleServants, ({ one }) => ({
	servant: one(servants, {
		fields: [saleServants.servantId],
		references: [servants.id],
	}),
	sale: one(sales, {
		fields: [saleServants.saleId],
		references: [sales.id],
	}),
}))
