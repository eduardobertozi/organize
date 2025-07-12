import { PageTemplate } from '@/components/templates/page-template'
import { Status } from './status'

export default function Dashboard() {
	return <PageTemplate content={<Status />} title="Bem vindo de volta" />
}
