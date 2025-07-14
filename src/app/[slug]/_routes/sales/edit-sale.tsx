import { SheetClosable } from '@/components/ui/extensions/sheet-closable'
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
	return (
		<SheetClosable.Root>
			<SheetClosable.Trigger asChild>{children}</SheetClosable.Trigger>
			<SheetClosable.Content
				className="min-h-2/3 rounded-t-2xl px-6 md:mx-auto md:w-sm"
				side="bottom"
			>
				<SheetClosable.Header className="px-0">
					<SheetClosable.Title>Editar Venda</SheetClosable.Title>
				</SheetClosable.Header>
				<div className="space-y-4">
					<FormAddSale sale={sale} />
				</div>
			</SheetClosable.Content>
		</SheetClosable.Root>
	)
}
