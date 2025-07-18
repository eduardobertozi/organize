export type SaleStatus = 'pending' | 'completed' | 'cancelled' | 'awaiting'

export type Sale = {
	id: string
	amount: number
	date: Date
	status: SaleStatus
	clientId: string | null
	sellerId: string | null
	servants?: string[]
}

export type SaleDetails = Sale & {
	name: string
	seller: string
}
