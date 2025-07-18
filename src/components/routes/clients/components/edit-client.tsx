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
import { useDeleteClient } from '@/http/hooks/clients/use-delete-client'
import type { Client } from '@/types/client'
import { FormAddClient } from './form-add-client'

type EditClientProps = {
	client?: Client | null
	children: React.ReactNode
}

export const EditClient: React.FC<EditClientProps> = ({
	client = null,
	children,
}) => {
	const deleteClient = useDeleteClient()

	async function handleDeleteClient() {
		if (!client) {
			return
		}

		await deleteClient.mutateAsync(client.id)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				className="h-[100svh] w-full rounded-t-2xl px-6 md:mx-auto md:h-auto md:min-h-3/4 md:w-1/2"
				side="bottom"
			>
				<SheetHeader className="px-0">
					<SheetTitle>Editar Cliente</SheetTitle>
					<SheetClose asChild>
						<Button
							className="text-destructive/50 hover:text-destructive"
							disabled={deleteClient.isPending}
							onClick={handleDeleteClient}
							type="button"
							variant="outline"
						>
							Excluir Cliente <TrashIcon size={16} />
						</Button>
					</SheetClose>
				</SheetHeader>
				<div className="space-y-4">
					<FormAddClient client={client} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
