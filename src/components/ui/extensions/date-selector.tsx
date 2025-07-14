'use client'

import { CalendarIcon } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { dayjs } from '@/lib/dayjs'
import { cn } from '@/lib/utils'

type DateSelectorProps = {
	defaultDate?: Date
	onChangeDate: (date?: Date) => void
}

export const DateSelector: React.FC<DateSelectorProps> = ({
	defaultDate,
	onChangeDate,
}) => {
	const id = useId()
	const [date, setDate] = useState<Date | undefined>(defaultDate)

	useEffect(() => {
		onChangeDate(date)
	}, [date, onChangeDate])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="group w-full justify-between border border-input bg-background px-3 font-normal text-foreground outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]"
					id={id}
				>
					<span className={cn('truncate', !date && 'text-muted-foreground')}>
						{date ? dayjs(date).format('DD/MM/YYYY') : 'Selecione uma data'}
					</span>
					<CalendarIcon
						aria-hidden="true"
						className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
						size={16}
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-auto p-2">
				<Calendar mode="single" onSelect={setDate} selected={date} />
			</PopoverContent>
		</Popover>
	)
}
