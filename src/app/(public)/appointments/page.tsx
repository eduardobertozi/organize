import { Appointments } from '@/components/routes/appointments'
import { PageTemplate } from '@/components/templates/page-template'

export default function AppointmentsPage() {
	return (
		<PageTemplate
			content={Appointments}
			description="Faça seu agendamento"
			title="Agendamentos"
		/>
	)
}
