import type { UseFormReturn } from 'react-hook-form'
import { Badge } from '@/components/ui/badge'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import type { FormAddSaleData } from './form-add-sale'

type StatusFieldProps = {
	isVisible?: boolean
	form: UseFormReturn<FormAddSaleData>
}

export const StatusField: React.FC<StatusFieldProps> = ({
	isVisible = false,
	form,
}) => {
	if (!isVisible) {
		return null
	}

	return (
		<FormField
			control={form.control}
			name="status"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Alterar Status</FormLabel>
					<FormControl>
						<Select
							{...field}
							defaultValue={field.value}
							onValueChange={field.onChange}
						>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="pending">
									<Badge className="bg-zinc-500">Pendente</Badge>
								</SelectItem>
								<SelectItem value="completed">
									<Badge className="bg-emerald-500">Concluído</Badge>
								</SelectItem>
								<SelectItem value="canceled">
									<Badge className="bg-red-500">Cancelado</Badge>
								</SelectItem>
								<SelectItem value="awaiting">
									<Badge className="bg-yellow-600">Aguardando</Badge>
								</SelectItem>
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
