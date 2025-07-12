import Image from 'next/image'
import type React from 'react'
import { cn } from '@/lib/utils'

type LogoProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>

export const Logo = ({ className, ...props }: LogoProps) => {
	return (
		<Image
			{...props}
			alt="Logo Organize"
			className={cn('h-8 w-8', className)}
			height={32}
			src="/logotipo.svg"
			width={32}
		/>
	)
}

export const LogoHorizontal = ({ className, ...props }: LogoProps) => {
	return (
		<Image
			{...props}
			alt="Logo Organize"
			className={cn('w-32', className)}
			data-testid="logo-horizontal"
			height={229}
			src="/logo-horizontal.svg"
			width={52}
		/>
	)
}
