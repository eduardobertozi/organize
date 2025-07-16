import { z } from 'zod'
import { realToCents } from '@/utils/currency'

/**
 * @param error - Mensagem de erro
 * @returns Schema de moeda com valor em centavos
 * @example
 * const schema = currencySchema('Defina um valor para o produto')
 * const data = schema.parse({ coast: 100 })
 * console.log(data) // { coast: 10000 }
 * objetivo: guardar o valor em centavos para evitar problemas com números decimais
 */
export const currencySchema = (error: string) =>
	z.coerce
		.number({ error })
		.transform((value) => value ?? 0)
		.transform((value) => realToCents(value))
