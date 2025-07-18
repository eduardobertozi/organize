import { redirect } from 'next/navigation'
import { privateRoutes } from '@/components/routes'

type PrivateRoutesProps = {
	params: Promise<{
		slug: string
	}>
}

export default async function PrivateRoutes({ params }: PrivateRoutesProps) {
	const { slug } = await params

	if (!slug) {
		return redirect('/dashboard')
	}

	return privateRoutes[slug as keyof typeof privateRoutes]
}
