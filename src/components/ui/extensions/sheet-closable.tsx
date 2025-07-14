'use client'

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
	const { isOpenSheet, setIsOpenSheet } = useGlobalStore((state) => state)

	return (
		<Sheet onOpenChange={setIsOpenSheet} open={isOpenSheet}>
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
