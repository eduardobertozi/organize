export type Product = {
	id: string
	description: string
	supplierId: string | null
	quantity: number | null
	coast: number
}

export type ProductDetails = Product & {
	supplierName: string
}
