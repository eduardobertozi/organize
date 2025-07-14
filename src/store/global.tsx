import { create } from 'zustand'

type GlobalStore = {
	search: string
	setSearch: (search: string) => void
	isOpenSheet: boolean
	setIsOpenSheet: (isOpen: boolean) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
	search: '',
	setSearch: (search: string) => set({ search }),
	isOpenSheet: false,
	setIsOpenSheet: (isOpen: boolean) => set({ isOpenSheet: isOpen }),
}))
