import { cn } from '@/lib/utils'
import { Input } from '../input'

type InputCurrencyProps = React.ComponentProps<typeof Input>

export const InputCurrency = ({ className, ...props }: InputCurrencyProps) => {
	return (
		<div className="relative">
			<Input className={cn('pl-9', className)} {...props} />
			<span className="absolute font-medium left-3 top-1/2 -translate-y-1/2 text-">
				R$
			</span>
		</div>
	)
}
