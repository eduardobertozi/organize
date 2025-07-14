'use client'

import { createContext, useContext, useState } from 'react'
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

type TSheetContext = {
	isOpen: boolean
	handleChangeOpen: (open: boolean) => void
}

const SheetContext = createContext<TSheetContext>({} as TSheetContext)

const SheetProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	function handleChangeOpen(open: boolean) {
		console.log('handleChangeOpen', open)
		setIsOpen(open)
	}

	return (
		<SheetContext.Provider value={{ isOpen, handleChangeOpen }}>
			{children}
		</SheetContext.Provider>
	)
}

export const useSheetContext = () => {
	const context = useContext(SheetContext)

	if (!context) {
		throw new Error('useSheetContext must be used within a SheetProvider')
	}

	return context
}

const SheetClosableRoot = ({ children }: { children: React.ReactNode }) => {
	const { isOpen, handleChangeOpen } = useSheetContext()

	return (
		<SheetProvider>
			<Sheet onOpenChange={handleChangeOpen} open={isOpen}>
				{children}
			</Sheet>
		</SheetProvider>
	)
}

const Root = ({ children }: { children: React.ReactNode }) => {
	return (
		<SheetProvider>
			<SheetClosableRoot>{children}</SheetClosableRoot>
		</SheetProvider>
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

/* TODO:
  - [ ] Corrigir o bug do sheet não fechar quando o componente é desmontado
*/
