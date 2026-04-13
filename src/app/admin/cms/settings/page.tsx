'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

interface CmsItem {
  key: string
  value: any
}

export default function AdminCMSSettings() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    logo: '',
    siteTitle: {en: '', zh: '', id: ''},
    heroTitle: {en: '', zh: '', id: ''},
    heroSubtitle: {en: '', zh: '', id: ''},
    whatsappNumber: '',
    contactEmail: '',
    contactPhone: '',
  })

  useEffect(() => {
    const loggedIn = document.cookie.includes('admin_logged_in=true')
    if (!loggedIn) {
      router.push('/admin/login')
      return
    }
    fetchSettings()
  }, [router])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/cms?key=settings')
      if (res.ok) {
        const data = await res.json()
        if (data.value) {
          setSettings({...settings, ...data.value})
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/cms/settings', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({key: 'settings', value: settings}),
      })
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings')
    }
    setSaving(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const locales = [
    {code: 'en', label: 'English'},
    {code: 'zh', label: '中文'},
    {code: 'id', label: 'Bahasa'},
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
            <input
              type="text"
              value={settings.logo}
              onChange={(e) => setSettings({...settings, logo: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              placeholder="+86 15711112233"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              placeholder="info@aikangmedtour.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              placeholder="+86 15711112233"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Multilingual Content</h3>
            
            {locales.map((locale) => (
              <div key={locale.code} className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="text-sm font-medium text-gray-600 mb-3">{locale.label}</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Site Title</label>
                    <input
                      type="text"
                      value={settings.siteTitle[locale.code as keyof typeof settings.siteTitle] || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        siteTitle: {...settings.siteTitle, [locale.code]: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="AiKang Medical Tour"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Hero Title</label>
                    <input
                      type="text"
                      value={settings.heroTitle[locale.code as keyof typeof settings.heroTitle] || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        heroTitle: {...settings.heroTitle, [locale.code]: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="Your Gateway to Premium Healthcare"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Hero Subtitle</label>
                    <textarea
                      value={settings.heroSubtitle[locale.code as keyof typeof settings.heroSubtitle] || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        heroSubtitle: {...settings.heroSubtitle, [locale.code]: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      rows={2}
                      placeholder="Description..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
