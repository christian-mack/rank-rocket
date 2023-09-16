import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rank Rocket',
  description: 'AI SEO workflow tool for content marketers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
