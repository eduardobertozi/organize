'use client'

import { useId } from 'react'
import { useGlobalStore } from '@/store/global'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../sheet'

const Root = ({ children }: { children: React.ReactNode }) => {
	const id = useId()
	const isOpenSheet = useGlobalStore((state) => state.isOpenSheet[id] || false)
	const setIsOpenSheet = useGlobalStore((state) => state.setIsOpenSheet)

	function handleOpenChange(open: boolean) {
		setIsOpenSheet(id, open)
	}

	return (
		<Sheet onOpenChange={handleOpenChange} open={isOpenSheet}>
			{children}
		</Sheet>
	)
}

export const SheetClosable = {
	Root,
	Trigger: SheetTrigger,
	Content: SheetContent,
	Header: SheetHeader,
	Title: SheetTitle,
	Description: SheetDescription,
	Footer: SheetFooter,
	Close: SheetClose,
}
