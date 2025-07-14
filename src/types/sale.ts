export type SaleStatus = 'pending' | 'completed' | 'cancelled' | 'awaiting'

export type Sale = {
	id: string
	amount: number
	date: Date
	status: SaleStatus
	clientId: string
	servantId: string[]
}

export type SaleDetails = {
	id: string
	name: string
	date: Date
	status: SaleStatus
	amount: number
}
