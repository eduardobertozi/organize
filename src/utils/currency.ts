/**
 * @param value - Valor em centavos
 * @returns Valor em reais
 */
export function realToCents(value: number): number {
	return value * 100
}

export function currency(value: number): string {
	const centsToReal = value / 100

	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(centsToReal)
}
