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
import { useDeleteServant } from '@/http/hooks/servants/use-delete-servant'
import type { Servant } from '@/types/servant'
import { FormAddServant } from './form-add-servant'

type EditServantProps = {
	servant?: Servant | null
	children: React.ReactNode
}

export const EditServant: React.FC<EditServantProps> = ({
	servant = null,
	children,
}) => {
	const deleteServant = useDeleteServant()

	async function handleDeleteServant() {
		if (!servant) {
			return
		}

		await deleteServant.mutateAsync(servant.id)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				className="h-[100svh] w-full rounded-t-2xl px-6 md:mx-auto md:h-auto md:min-h-3/4 md:w-1/2"
				side="bottom"
			>
				<SheetHeader className="px-0">
					<SheetTitle>Editar Serviço</SheetTitle>
					<SheetClose asChild>
						<Button
							className="text-destructive/50 hover:text-destructive"
							disabled={deleteServant.isPending}
							onClick={handleDeleteServant}
							type="button"
							variant="outline"
						>
							Excluir Serviço <TrashIcon size={16} />
						</Button>
					</SheetClose>
				</SheetHeader>
				<div className="space-y-4">
					<FormAddServant servant={servant} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
