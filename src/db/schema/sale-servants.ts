import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { sale } from './sale'
import { servant } from './servant'

export const saleServants = pgTable(
	'sale_servants',
	{
		saleId: uuid()
			.notNull()
			.references(() => sale.id),
		servantId: uuid()
			.notNull()
			.references(() => servant.id),
	},
	(t) => [primaryKey({ columns: [t.saleId, t.servantId] })]
)

export const saleServantsRelations = relations(saleServants, ({ one }) => ({
	servant: one(servant, {
		fields: [saleServants.servantId],
		references: [servant.id],
	}),
	sale: one(sale, {
		fields: [saleServants.saleId],
		references: [sale.id],
	}),
}))
