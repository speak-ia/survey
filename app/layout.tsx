import type { Metadata } from 'next'
import './globals.css'
import { ClientLayout } from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'What do you think about me (Mohamed TRAORE)?',
  description: 'Aidez-moi à grandir en partageant des retours honnêtes et constructifs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}