import { ComponentProps } from 'react'
import { IMaskInput } from 'react-imask'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type InputMaskProps = ComponentProps<typeof Input & typeof IMaskInput>

export const InputMask = ({ className, ...props }: InputMaskProps) => {
	return (
		<IMaskInput
			className={cn(
				'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-foreground focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			data-slot="input"
			{...props}
		/>
	)
}
