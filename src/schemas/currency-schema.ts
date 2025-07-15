import { z } from 'zod/v3'
import { realToCents } from '@/utils/currency'

/**
 * @param message - Mensagem de erro
 * @returns Schema de moeda com valor em centavos
 * @example
 * const schema = currencySchema('Defina um valor para o produto')
 * const data = schema.parse({ coast: 100 })
 * console.log(data) // { coast: 10000 }
 * objetivo: guardar o valor em centavos para evitar problemas com números decimais
 */
export const currencySchema = (message: string) =>
	z.coerce
		.number({ required_error: message })
		.transform((value) => realToCents(value))
