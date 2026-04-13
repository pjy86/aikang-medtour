'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    {href: '/admin/cms', label: 'Dashboard'},
    {href: '/admin/cms/settings', label: 'Site Settings'},
    {href: '/admin/cms/advantages', label: 'Advantages'},
    {href: '/admin/cms/services', label: 'Services'},
    {href: '/admin/cms/testimonials', label: 'Testimonials'},
    {href: '/admin/cms/fields', label: 'Form Fields'},
    {href: '/admin/inquiries', label: 'Inquiries'},
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/en" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">爱</span>
            </div>
            <span className="font-bold text-xl text-gray-900">AiKang Admin</span>
          </Link>
          <Link href="/admin/login" className="text-sm text-gray-600 hover:text-gray-900">
            Logout
          </Link>
        </div>
        <nav className="bg-gray-50 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
