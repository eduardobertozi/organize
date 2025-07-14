'use client'

import { useEffect, useState } from 'react'
import MultipleSelector, { type Option } from '@/components/ui/multiselect'

type MultiSelectorProps = {
	items?: Option[]
	onChangeValue: (value: string[]) => void
}

export const MultiSelector: React.FC<MultiSelectorProps> = ({
	items,
	onChangeValue,
}) => {
	const [value, setValue] = useState<Option[]>()

	useEffect(() => {
		onChangeValue(value?.map((item) => item.value) ?? [])
	}, [value, onChangeValue])

	return (
		<MultipleSelector
			commandProps={{
				label: 'Selecionar',
			}}
			defaultOptions={items}
			emptyIndicator={
				<p className="text-center text-sm">Nenhum resultado encontrado</p>
			}
			hideClearAllButton
			hidePlaceholderWhenSelected
			onChange={(v) => setValue(v)}
			placeholder="Selecionar"
			value={value}
		/>
	)
}
