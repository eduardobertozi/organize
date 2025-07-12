'use server'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function getUser() {
	return auth.api.getSession({
		headers: await headers(),
	})
}
