import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AiKang Medical Tour - Your Gateway to Premium Healthcare in China',
  description: 'AiKang Medical Tour provides comprehensive medical tourism services for international patients from the US and Indonesia, offering world-class treatment with zero waiting time and significant cost savings.',
  keywords: 'medical tourism China, healthcare tourism China, medical travel China, Chinese hospitals, premium healthcare',
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