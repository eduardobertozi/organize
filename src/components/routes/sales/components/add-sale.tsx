import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { FormAddSale } from './form-add-sale'

export const AddSale = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="h-11 w-full bg-indigo-900 text-white hover:bg-indigo-800">
					Nova
				</Button>
			</SheetTrigger>
			<SheetContent
				className="h-[100svh] w-full rounded-t-2xl px-6 md:mx-auto md:h-auto md:min-h-3/4 md:w-1/2"
				side="bottom"
			>
				<SheetHeader className="px-0">
					<SheetTitle>Nova Venda</SheetTitle>
				</SheetHeader>
				<div className="space-y-4">
					<FormAddSale />
				</div>
			</SheetContent>
		</Sheet>
	)
}
