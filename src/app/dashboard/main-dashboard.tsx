'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SaleStatus } from './_components/sale-status'

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

export const MainDashboard = () => {
	return (
		<div className="space-y-8">
			<SaleStatus />
			<div className="flex flex-col gap-4">
				<Option
					className="bg-teal-800 hover:bg-teal-700"
					href="/dashboard/sales"
				>
					Vendas
				</Option>
				{/* <Option href="/dashboard/clients">Clientes</Option> */}
				<Option href="/dashboard/products">Produtos</Option>
				<Option href="/dashboard/servants">Serviços</Option>
			</div>
		</div>
	)
}
