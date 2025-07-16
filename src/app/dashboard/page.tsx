import { PageTemplate } from '@/components/templates/page-template'
import { MainDashboard } from './main-dashboard'

export default function Dashboard() {
	return <PageTemplate content={<MainDashboard />} title="Bem vindo de volta" />
}
