import { create } from 'zustand'

type GlobalStore = {
	search: string
	setSearch: (search: string) => void
	isOpenSheet: Record<string, boolean>
	setIsOpenSheet: (id: string, isOpen: boolean) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
	search: '',
	setSearch: (search: string) => set({ search }),
	isOpenSheet: {},
	setIsOpenSheet: (id, isOpen) =>
		set((state) => ({ isOpenSheet: { ...state.isOpenSheet, [id]: isOpen } })),
}))
