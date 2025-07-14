export type Product = {
	id: string
	description: string
	supplierId: string
	coast: number
}

export type ProductDetails = Product & {
	supplierName: string
}
