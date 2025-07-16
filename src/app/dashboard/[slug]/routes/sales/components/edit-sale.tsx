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
import { useDeleteSale } from '@/http/hooks/sales/use-delete-sale'
import type { Sale } from '@/types/sale'
import { FormAddSale } from './form-add-sale'

type EditSaleProps = {
	sale?: Sale | null
	children: React.ReactNode
}

export const EditSale: React.FC<EditSaleProps> = ({
	sale = null,
	children,
}) => {
	const deleteSale = useDeleteSale()

	async function handleDeleteSale() {
		if (!sale) {
			return
		}

		await deleteSale.mutateAsync(sale.id)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				className="h-[100svh] w-full rounded-t-2xl px-6 md:mx-auto md:h-auto md:min-h-3/4 md:w-1/2"
				side="bottom"
			>
				<SheetHeader className="px-0">
					<SheetTitle>Editar Venda</SheetTitle>
					<SheetClose asChild>
						<Button
							className="text-destructive/50 hover:text-destructive"
							disabled={deleteSale.isPending}
							onClick={handleDeleteSale}
							type="button"
							variant="outline"
						>
							Excluir Venda <TrashIcon size={16} />
						</Button>
					</SheetClose>
				</SheetHeader>
				<div className="space-y-4">
					<FormAddSale sale={sale} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
