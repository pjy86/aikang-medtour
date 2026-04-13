'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

interface Service {
  id: string
  icon: string
  title: {en: string, zh: string, id: string}
  description: {en: string, zh: string, id: string}
  features: {en: string[], zh: string[], id: string[]}
  typicalCost: string
  vsUsCost: string
}

export default function AdminCMSServices() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<Service[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Service | null>(null)

  useEffect(() => {
    const loggedIn = document.cookie.includes('admin_logged_in=true')
    if (!loggedIn) {
      router.push('/admin/login')
      return
    }
    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/cms?key=services')
      if (res.ok) {
        const data = await res.json()
        if (data.value) {
          setServices(data.value)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!editData) return
    const newServices = editingId === 'new' 
      ? [...services, {...editData, id: Date.now().toString()}]
      : services.map(s => s.id === editingId ? editData : s)
    
    try {
      await fetch('/api/cms/services', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({key: 'services', value: newServices}),
      })
      setServices(newServices)
      setEditingId(null)
      setEditData(null)
    } catch (error) {
      console.error('Error saving:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    const newServices = services.filter(s => s.id !== id)
    try {
      await fetch('/api/cms/services', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({key: 'services', value: newServices}),
      })
      setServices(newServices)
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const startAdd = () => {
    setEditData({
      id: 'new',
      icon: '🏥',
      title: {en: '', zh: '', id: ''},
      description: {en: '', zh: '', id: ''},
      features: {en: [''], zh: [''], id: ['']},
      typicalCost: '',
      vsUsCost: '',
    })
    setEditingId('new')
  }

  const startEdit = (item: Service) => {
    setEditData({...item, features: {...item.features, en: [...(item.features.en || [])]}})
    setEditingId(item.id)
  }

  const updateFeature = (locale: string, index: number, value: string) => {
    if (!editData) return
    const newFeatures = [...(editData.features[locale as keyof typeof editData.features] || [])]
    newFeatures[index] = value
    setEditData({
      ...editData,
      features: {...editData.features, [locale]: newFeatures}
    })
  }

  const addFeature = (locale: string) => {
    if (!editData) return
    const features = editData.features[locale as keyof typeof editData.features] || []
    setEditData({
      ...editData,
      features: {...editData.features, [locale]: [...features, '']}
    })
  }

  if (loading) return <div>Loading...</div>

  const locales = [
    {code: 'en', label: 'English'},
    {code: 'zh', label: '中文'},
    {code: 'id', label: 'Bahasa'},
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
        <button
          onClick={startAdd}
          className="bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700"
        >
          + Add New
        </button>
      </div>

      {services.length === 0 && !editingId && (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          No services yet. Click "Add New" to create one.
        </div>
      )}

      <div className="space-y-4">
        {services.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow">
            {editingId === item.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                    <input
                      type="text"
                      value={editData?.icon}
                      onChange={(e) => setEditData({...editData!, icon: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Typical Cost ($)</label>
                    <input
                      type="text"
                      value={editData?.typicalCost}
                      onChange={(e) => setEditData({...editData!, typicalCost: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="$15,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">US Cost ($)</label>
                    <input
                      type="text"
                      value={editData?.vsUsCost}
                      onChange={(e) => setEditData({...editData!, vsUsCost: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="$100,000+"
                    />
                  </div>
                </div>

                {locales.map((locale) => (
                  <div key={locale.code} className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">{locale.label}</h4>
                    <input
                      type="text"
                      value={editData?.title[locale.code as keyof typeof editData.title] || ''}
                      onChange={(e) => setEditData({
                        ...editData!,
                        title: {...editData!.title, [locale.code]: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-2"
                      placeholder="Service Title"
                    />
                    <textarea
                      value={editData?.description[locale.code as keyof typeof editData.description] || ''}
                      onChange={(e) => setEditData({
                        ...editData!,
                        description: {...editData!.description, [locale.code]: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-2"
                      rows={2}
                      placeholder="Description"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Features</label>
                        <button
                          onClick={() => addFeature(locale.code)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          + Add Feature
                        </button>
                      </div>
                      {(editData?.features[locale.code as keyof typeof editData.features] || []).map((f: string, i: number) => (
                        <input
                          key={i}
                          type="text"
                          value={f}
                          onChange={(e) => updateFeature(locale.code, i, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                          placeholder={`Feature ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {setEditingId(null); setEditData(null)}}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title.en || item.title.zh}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description.en || item.description.zh}</p>
                    <p className="text-sm text-accent-600 mt-1">Cost: {item.typicalCost} (US: {item.vsUsCost})</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {editingId === 'new' && editData && (
        <div className="bg-white rounded-2xl p-6 shadow mt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Service</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                <input
                  type="text"
                  value={editData.icon}
                  onChange={(e) => setEditData({...editData, icon: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Typical Cost</label>
                <input
                  type="text"
                  value={editData.typicalCost}
                  onChange={(e) => setEditData({...editData, typicalCost: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">US Cost</label>
                <input
                  type="text"
                  value={editData.vsUsCost}
                  onChange={(e) => setEditData({...editData, vsUsCost: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {locales.map((locale) => (
              <div key={locale.code} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="text-sm font-medium text-gray-600 mb-2">{locale.label}</h4>
                <input
                  type="text"
                  value={editData.title[locale.code as keyof typeof editData.title] || ''}
                  onChange={(e) => setEditData({
                    ...editData,
                    title: {...editData.title, [locale.code]: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-2"
                  placeholder="Service Title"
                />
                <textarea
                  value={editData.description[locale.code as keyof typeof editData.description] || ''}
                  onChange={(e) => setEditData({
                    ...editData,
                    description: {...editData.description, [locale.code]: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-2"
                  rows={2}
                  placeholder="Description"
                />
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Features</label>
                  {(editData.features[locale.code as keyof typeof editData.features] || []).map((f: string, i: number) => (
                    <input
                      key={i}
                      type="text"
                      value={f}
                      onChange={(e) => updateFeature(locale.code, i, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                    />
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {setEditingId(null); setEditData(null)}}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
