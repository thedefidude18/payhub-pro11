import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PayVeri - Secure File Preview & Payment Platform',
  description: 'PayVeri helps freelancers securely share file previews with clients, manage feedback, and receive payments before delivery.',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon-black.svg',
    apple: '/favicon-white.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
