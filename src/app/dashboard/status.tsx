import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type OptionProps = React.ComponentProps<typeof Button>

export const Option: React.FC<OptionProps> = ({ className, ...props }) => {
	return (
		<Button
			{...props}
			className={cn(
				'h-10 w-full cursor-pointer bg-indigo-800 text-white transition hover:bg-indigo-700',
				className
			)}
		/>
	)
}

export const Status = () => {
	return (
		<div className="space-y-8">
			<div>
				<div className="flex gap-2">
					<span>Saldo do dia:</span>
					<span className="font-semibold">R$ 1000,00</span>
				</div>
				<div className="flex gap-2">
					<span>Vendas da semana:</span>
					<span className="font-semibold">25</span>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<Option>Fornecedores</Option>
				<Option>Produtos</Option>
				<Option>Serviços</Option>
				<Option className="bg-teal-800 hover:bg-teal-700">Vendas</Option>
			</div>
		</div>
	)
}
