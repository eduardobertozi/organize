'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import type React from 'react'
import { useId, useState } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type InputPasswordProps = React.ComponentProps<typeof Input>

export default function InputPassword({
	className,
	...props
}: InputPasswordProps) {
	const id = useId()
	const [isVisible, setIsVisible] = useState<boolean>(false)

	const toggleVisibility = () => setIsVisible((prevState) => !prevState)

	return (
		<div className={cn('relative', className)}>
			<Input
				{...props}
				className="pe-9"
				id={id}
				type={isVisible ? 'text' : 'password'}
			/>
			<button
				aria-controls="password"
				aria-label={isVisible ? 'Esconder senha' : 'Mostrar senha'}
				aria-pressed={isVisible}
				className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				onClick={toggleVisibility}
				type="button"
			>
				{isVisible ? (
					<EyeOffIcon aria-hidden="true" size={16} />
				) : (
					<EyeIcon aria-hidden="true" size={16} />
				)}
			</button>
		</div>
	)
}
