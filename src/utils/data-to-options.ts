import type { Option } from '@/types/option'

type TransformToOptionsProps<Data> = {
	label: keyof Data
	value: keyof Data
}

export function transformToOptions<Data>(
	items: Data[],
	{ label, value }: TransformToOptionsProps<Data>
): Option[] {
	return items.map((item) => ({
		label: item[label] as string,
		value: item[value] as string,
	}))
}
