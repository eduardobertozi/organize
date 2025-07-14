import { useId } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type InputIconProps = React.ComponentProps<typeof Input> & {
	icon: React.ElementType
	side?: 'left' | 'right'
}

export const InputIcon: React.FC<InputIconProps> = ({
	icon: Icon,
	side = 'right',
	className,
	...props
}) => {
	const id = useId()
	return (
		<div className="relative w-full">
			<Input
				className={cn('peer', side === 'left' ? 'ps-9' : 'pe-9', className)}
				id={id}
				{...props}
			/>
			<div
				className={cn(
					'pointer-events-none absolute inset-y-0 flex items-center justify-center px-3 text-muted-foreground/80 peer-disabled:opacity-50',
					side === 'left' ? 'start-0' : 'end-0'
				)}
			>
				<Icon aria-hidden="true" size={16} />
			</div>
		</div>
	)
}
