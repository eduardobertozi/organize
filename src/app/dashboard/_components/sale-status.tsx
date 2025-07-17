import { Skeleton } from '@/components/ui/skeleton'
import { useGetSalesCount } from '@/http/hooks/sales/use-get-sales-count'
import { currency } from '@/utils/currency'

export const SaleStatus = () => {
	const { data, isLoading } = useGetSalesCount()

	function weekSalesAmount() {
		if (!data) {
			return 0
		}

		const value = data[0].value

		if (!value) {
			return 0
		}

		return currency(+value)
	}

	return (
		<div>
			{isLoading ? (
				<div className="space-y-2">
					<Skeleton className="h-5 w-40 rounded-sm" />
					<Skeleton className="h-5 w-48 rounded-sm" />
				</div>
			) : (
				<div className="space-y-1">
					<div className="flex gap-2">
						<span>Saldo acumulado na semana:</span>
						<span className="font-semibold">{weekSalesAmount()}</span>
					</div>
					<div className="flex gap-2">
						<span>Vendas da semana:</span>
						<span className="font-semibold">{data ? data[0].count : null}</span>
					</div>
				</div>
			)}
		</div>
	)
}
