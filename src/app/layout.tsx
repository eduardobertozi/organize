import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { QueryProvider } from '@/providers/query'

const dmSans = DM_Sans({
	variable: '--font-dm-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Organize',
	description: 'Saia do caderninho, Organize',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html className="dark" lang="pt-BR">
			<body className={`${dmSans.className} antialiased`}>
				<QueryProvider>{children}</QueryProvider>
				<Toaster richColors />
			</body>
		</html>
	)
}
