import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '爱康医旅 - Your Gateway to Premium Healthcare in China',
  description: '爱康医旅专注为海外客户（美国及印尼）提供来华高端医疗服务，提供全流程一站式服务，让您在China享受世界级医疗体验。',
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