'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'

export default function AdminCMSDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    document.cookie = 'admin_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/admin/login')
  }

  const cmsSections = [
    {
      title: 'Site Settings',
      description: 'Manage website logo, title, and global settings',
      href: '/admin/cms/settings',
      icon: '⚙️',
    },
    {
      title: 'Advantages',
      description: 'Manage "Why Choose Us" section content',
      href: '/admin/cms/advantages',
      icon: '🏆',
    },
    {
      title: 'Services',
      description: 'Manage medical services offered',
      href: '/admin/cms/services',
      icon: '🏥',
    },
    {
      title: 'Testimonials',
      description: 'Manage patient testimonials and reviews',
      href: '/admin/cms/testimonials',
      icon: '⭐',
    },
    {
      title: 'Form Fields',
      description: 'Manage contact form fields',
      href: '/admin/cms/fields',
      icon: '📝',
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cmsSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{section.icon}</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h2>
            <p className="text-gray-600 text-sm">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
