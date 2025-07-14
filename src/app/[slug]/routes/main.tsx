'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetSalesCount } from '@/http/hooks/sales/use-get-sales-count'
import { cn } from '@/lib/utils'

type OptionProps = React.ComponentProps<typeof Button> & {
	href?: string
}

export const Option: React.FC<OptionProps> = ({
	className,
	href = '/',
	...props
}) => {
	const { replace } = useRouter()

	function handleClick() {
		replace(href)
	}

	return (
		<Button
			{...props}
			className={cn(
				'h-10 w-full cursor-pointer bg-indigo-800 text-white transition hover:bg-indigo-700',
				className
			)}
			onClick={handleClick}
		/>
	)
}

export const Main = () => {
	const { data, isLoading } = useGetSalesCount()

	return (
		<div className="space-y-8">
			{isLoading ? (
				<div className="space-y-2">
					<Skeleton className="h-5 w-40 rounded-sm" />
					<Skeleton className="h-5 w-48 rounded-sm" />
				</div>
			) : (
				<div className="space-y-1">
					<div className="flex gap-2">
						<span>Saldo do dia:</span>
						<span className="font-semibold">R$ 1000,00</span>
					</div>
					<div className="flex gap-2">
						<span>Vendas da semana:</span>
						<span className="font-semibold">{data ? data[0].count : null}</span>
					</div>
				</div>
			)}
			<div className="flex flex-col gap-4">
				<Option className="bg-teal-800 hover:bg-teal-700" href="/sales">
					Vendas
				</Option>
				<Option href="/clients">Clientes</Option>
				<Option href="/products">Produtos</Option>
				<Option href="/servants">Serviços</Option>
			</div>
		</div>
	)
}
