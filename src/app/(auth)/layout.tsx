import { redirect } from 'next/navigation'
import { getUser } from '@/http/actions/auth/get-user'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getUser()

	if (session) {
		return redirect('/')
	}

	return children
}
