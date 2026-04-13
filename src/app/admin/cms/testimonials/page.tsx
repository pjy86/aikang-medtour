'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

interface Testimonial {
  id: string
  name: string
  country: string
  treatment: string
  quote: {en: string, zh: string, id: string}
  rating: number
}

export default function AdminCMSTestimonials() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Testimonial | null>(null)

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
      const res = await fetch('/api/cms?key=testimonials')
      if (res.ok) {
        const data = await res.json()
        if (data.value) {
          setTestimonials(data.value)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!editData) return
    const newData = editingId === 'new' 
      ? [...testimonials, {...editData, id: Date.now().toString()}]
      : testimonials.map(t => t.id === editingId ? editData : t)
    
    try {
      const res = await fetch('/api/cms/testimonials', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({key: 'testimonials', value: newData}),
      })
      if (res.ok) {
        setTestimonials(newData)
        setEditingId(null)
        setEditData(null)
      } else {
        const data = await res.json()
        alert('Error: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error saving:', error)
      alert('Error saving')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    const newData = testimonials.filter(t => t.id !== id)
    try {
      await fetch('/api/cms/testimonials', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({key: 'testimonials', value: newData}),
      })
      setTestimonials(newData)
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const startAdd = () => {
    setEditData({
      id: 'new',
      name: '',
      country: '',
      treatment: '',
      quote: {en: '', zh: '', id: ''},
      rating: 5,
    })
    setEditingId('new')
  }

  const startEdit = (item: Testimonial) => {
    setEditData({...item})
    setEditingId(item.id)
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
        <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
        <button
          onClick={startAdd}
          className="bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700"
        >
          + Add New
        </button>
      </div>

      {testimonials.length === 0 && !editingId && (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          No testimonials yet. Click "Add New" to create one.
        </div>
      )}

      <div className="space-y-4">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow">
            {editingId === item.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      value={editData?.name}
                      onChange={(e) => setEditData({...editData!, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={editData?.country}
                      onChange={(e) => setEditData({...editData!, country: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="USA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                    <input
                      type="text"
                      value={editData?.treatment}
                      onChange={(e) => setEditData({...editData!, treatment: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="Heart Bypass"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editData?.rating}
                    onChange={(e) => setEditData({...editData!, rating: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  />
                </div>

                {locales.map((locale) => (
                  <div key={locale.code} className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">{locale.label}</h4>
                    <textarea
                      value={editData?.quote[locale.code as keyof typeof editData.quote] || ''}
                      onChange={(e) => setEditData({
                        ...editData!,
                        quote: {...editData!.quote, [locale.code]: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      rows={3}
                      placeholder="Testimonial quote..."
                    />
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
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-sm text-gray-500">{item.country} • {item.treatment}</span>
                  </div>
                  <p className="text-gray-600 italic">"{item.quote.en || item.quote.zh}"</p>
                  <div className="flex mt-2">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className={i <= item.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Testimonial</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={editData.country}
                  onChange={(e) => setEditData({...editData, country: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                <input
                  type="text"
                  value={editData.treatment}
                  onChange={(e) => setEditData({...editData, treatment: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {locales.map((locale) => (
              <div key={locale.code} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="text-sm font-medium text-gray-600 mb-2">{locale.label}</h4>
                <textarea
                  value={editData.quote[locale.code as keyof typeof editData.quote] || ''}
                  onChange={(e) => setEditData({
                    ...editData,
                    quote: {...editData.quote, [locale.code]: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  rows={3}
                  placeholder="Testimonial quote..."
                />
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
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
