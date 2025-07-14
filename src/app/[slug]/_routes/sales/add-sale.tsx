import { Button } from '@/components/ui/button'
import { SheetClosable } from '@/components/ui/extensions/sheet-closable'
import { FormAddSale } from './form-add-sale'

export const AddSale = () => {
	return (
		<SheetClosable.Root>
			<SheetClosable.Trigger asChild>
				<Button className="h-11 w-full bg-indigo-900 text-white hover:bg-indigo-800">
					Nova
				</Button>
			</SheetClosable.Trigger>
			<SheetClosable.Content
				className="min-h-2/3 rounded-t-2xl px-6 md:mx-auto md:w-sm"
				side="bottom"
			>
				<SheetClosable.Header className="px-0">
					<SheetClosable.Title>Nova Venda</SheetClosable.Title>
				</SheetClosable.Header>
				<div className="space-y-4">
					<FormAddSale />
				</div>
			</SheetClosable.Content>
		</SheetClosable.Root>
	)
}
