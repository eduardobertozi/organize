/** biome-ignore-all lint/a11y/useSemanticElements: shadcn need this */
'use client'

import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import type React from 'react'
import { useEffect, useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Items = Array<{
	value: string
	label: string
}>

type SelectOptionProps = {
	items?: Items
	onChangeValue: (value: string) => void
}

export const SelectOption: React.FC<SelectOptionProps> = ({
	items,
	onChangeValue,
}) => {
	const id = useId()
	const [open, setOpen] = useState<boolean>(false)
	const [value, setValue] = useState<string>('')

	useEffect(() => {
		onChangeValue(value)
	}, [value, onChangeValue])

	return (
		<div>
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild>
					<Button
						aria-expanded={open}
						className="w-full justify-between border border-input bg-background px-3 font-normal text-foreground outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]"
						id={id}
						role="combobox"
						type="button"
					>
						<span className={cn('truncate', !value && 'text-muted-foreground')}>
							{value
								? items?.find((item) => item.value === value)?.label
								: 'Selecionar'}
						</span>
						<ChevronDownIcon
							aria-hidden="true"
							className="shrink-0 text-muted-foreground/80"
							size={16}
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align="start"
					className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
				>
					<Command className="bg-background">
						<CommandInput placeholder="Buscar..." />
						<CommandList>
							<CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
							<CommandGroup>
								{items?.map((item) => (
									<CommandItem
										key={item.value}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? '' : currentValue)
											setOpen(false)
										}}
										value={item.value}
									>
										{item.label}
										{value === item.value && (
											<CheckIcon className="ml-auto" size={16} />
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
