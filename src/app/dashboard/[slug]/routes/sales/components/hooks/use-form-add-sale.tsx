import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useFetchClients } from '@/http/hooks/clients/use-fetch-clients'
import { useAddSale } from '@/http/hooks/sales/use-add-sale'
import { useFetchSaleServants } from '@/http/hooks/sales/use-fetch-sale-servants'
import { useFetchServants } from '@/http/hooks/servants/use-fetch-servants'
import { resolver } from '@/lib/zod'
import {
	type FormAddSaleData,
	formAddSaleSchema,
} from '@/schemas/add-sale-schema'
import type { Sale } from '@/types/sale'
import { transformToOptions } from '@/utils/data-to-options'

type FormAddSaleParams = {
	sale?: Sale | null
}

export const useFormAddSale = ({ sale }: FormAddSaleParams) => {
	const form = useForm<FormAddSaleData>({
		defaultValues: {
			amount: sale ? sale.amount / 100 : 0,
			clientId: sale?.clientId || '',
			servants: sale?.servants || [],
			date: sale?.date || new Date(),
			status: sale?.status || 'pending',
		},
		resolver: resolver(formAddSaleSchema),
	})

	const isVisible = sale !== null

	const clients = useFetchClients()
	const clientsOptions = transformToOptions(clients.data ?? [], {
		label: 'name',
		value: 'id',
	})

	const servants = useFetchServants()
	const servantsOptions = transformToOptions(servants.data ?? [], {
		label: 'description',
		value: 'id',
	})

	const saleServants = useFetchSaleServants(sale?.id ?? '')
	const defaultServants = servantsOptions.filter((servant) =>
		saleServants.data?.some(
			(saleServant) => saleServant.servantId === servant.value
		)
	)
	const isLoadingServants = servants.isLoading || saleServants.isLoading

	const servantsData = useMemo(() => servants.data ?? [], [servants.data])
	const selectedServantIds = useWatch({
		control: form.control,
		name: 'servants',
	})

	useEffect(() => {
		if (selectedServantIds && servantsData.length > 0) {
			const total = selectedServantIds.reduce((acc, servantId) => {
				const servant = servantsData.find((s) => s.id === servantId)
				return acc + (servant?.value || 0)
			}, 0)

			form.setValue('amount', total / 100)
		}
	}, [selectedServantIds, servantsData, form.setValue])

	const addSale = useAddSale(sale?.id)

	return {
		form,
		clientsOptions,
		servantsOptions,
		defaultServants,
		isLoadingServants,
		addSale,
		isVisible,
	}
}
