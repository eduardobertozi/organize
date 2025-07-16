import { redirect } from 'next/navigation'
import { getUser } from '@/http/actions/auth/get-user'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await getUser()

	if (!user) {
		return redirect('/sign-in')
	}

	return <>{children}</>
}
