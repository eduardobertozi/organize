import { TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SheetClosable } from '@/components/ui/extensions/sheet-closable'
import { useDeleteSale } from '@/hooks/useDeleteSale'
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
		<SheetClosable.Root>
			<SheetClosable.Trigger asChild>{children}</SheetClosable.Trigger>
			<SheetClosable.Content
				className="min-h-2/3 rounded-t-2xl px-6 md:mx-auto md:w-sm"
				side="bottom"
			>
				<SheetClosable.Header className="px-0">
					<SheetClosable.Title>Editar Venda</SheetClosable.Title>
					<Button
						className="text-destructive/50 hover:text-destructive"
						disabled={deleteSale.isPending}
						onClick={handleDeleteSale}
						type="button"
						variant="outline"
					>
						Excluir Venda <TrashIcon size={16} />
					</Button>
				</SheetClosable.Header>
				<div className="space-y-4">
					<FormAddSale sale={sale} />
				</div>
			</SheetClosable.Content>
		</SheetClosable.Root>
	)
}
