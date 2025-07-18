import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { FormAddClient } from '../components/form-add-client'

export const AddClient = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="h-10 w-full bg-indigo-900 text-white hover:bg-indigo-800">
					Novo
				</Button>
			</SheetTrigger>
			<SheetContent
				className="h-[100svh] w-full rounded-t-2xl px-6 md:mx-auto md:h-auto md:min-h-3/4 md:w-1/2"
				side="bottom"
			>
				<SheetHeader className="px-0">
					<SheetTitle>Novo Cliente</SheetTitle>
				</SheetHeader>
				<div className="space-y-4">
					<FormAddClient />
				</div>
			</SheetContent>
		</Sheet>
	)
}
