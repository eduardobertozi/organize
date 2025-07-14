'use client'

import { TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useDeleteProduct } from '@/hooks/products/use-delete-product'
import type { Product } from '@/types/product'
import { FormAddProduct } from './form-add-product'

type EditProductProps = {
	product?: Product | null
	children: React.ReactNode
}

export const EditProduct: React.FC<EditProductProps> = ({
	product = null,
	children,
}) => {
	const deleteProduct = useDeleteProduct()

	async function handleDeleteProduct() {
		if (!product) {
			return
		}

		await deleteProduct.mutateAsync(product.id)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				className="h-[100svh] w-full rounded-t-2xl px-6 md:mx-auto md:h-auto md:min-h-3/4 md:w-1/2"
				side="bottom"
			>
				<SheetHeader className="px-0">
					<SheetTitle>Editar Produto</SheetTitle>
					<SheetClose asChild>
						<Button
							className="text-destructive/50 hover:text-destructive"
							disabled={deleteProduct.isPending}
							onClick={handleDeleteProduct}
							type="button"
							variant="outline"
						>
							Excluir Produto <TrashIcon size={16} />
						</Button>
					</SheetClose>
				</SheetHeader>
				<div className="space-y-4">
					<FormAddProduct product={product} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
