'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

interface FormField {
  id: string
  name: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  label: {en: string, zh: string, id: string}
  placeholder: {en: string, zh: string, id: string}
  required: boolean
  options: {en: string[], zh: string[], id: string[]}
  order: number
}

export default function AdminCMSFields() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [fields, setFields] = useState<FormField[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<FormField | null>(null)

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
      const res = await fetch('/api/cms?key=formFields')
      if (res.ok) {
        const data = await res.json()
        if (data.value) {
          setFields(data.value)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!editData) return
    const newFields = editingId === 'new' 
      ? [...fields, {...editData, id: Date.now().toString()}]
      : fields.map(f => f.id === editingId ? editData : f)
    
    try {
      await fetch('/api/cms/fields', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({key: 'formFields', value: newFields}),
      })
      setFields(newFields)
      setEditingId(null)
      setEditData(null)
    } catch (error) {
      console.error('Error saving:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this field?')) return
    const newFields = fields.filter(f => f.id !== id)
    try {
      await fetch('/api/cms/fields', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({key: 'formFields', value: newFields}),
      })
      setFields(newFields)
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const startAdd = () => {
    setEditData({
      id: 'new',
      name: '',
      type: 'text',
      label: {en: '', zh: '', id: ''},
      placeholder: {en: '', zh: '', id: ''},
      required: false,
      options: {en: [], zh: [], id: []},
      order: fields.length + 1,
    })
    setEditingId('new')
  }

  const startEdit = (item: FormField) => {
    setEditData({...item})
    setEditingId(item.id)
  }

  const updateOptions = (locale: string, value: string) => {
    if (!editData) return
    const newOptions = {...editData.options, [locale]: value.split('\n').filter(o => o.trim())}
    setEditData({...editData, options: newOptions})
  }

  if (loading) return <div>Loading...</div>

  const locales = [
    {code: 'en', label: 'English'},
    {code: 'zh', label: '中文'},
    {code: 'id', label: 'Bahasa'},
  ]

  const fieldTypes = [
    {value: 'text', label: 'Text Input'},
    {value: 'email', label: 'Email Input'},
    {value: 'tel', label: 'Phone Input'},
    {value: 'select', label: 'Dropdown Select'},
    {value: 'textarea', label: 'Text Area'},
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Form Fields Management</h1>
        <button
          onClick={startAdd}
          className="bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700"
        >
          + Add New
        </button>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> These fields define the contact form on the website. 
          Changes will be reflected immediately after saving.
        </p>
      </div>

      {fields.length === 0 && !editingId && (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          No form fields yet. Click "Add New" to create one.
        </div>
      )}

      <div className="space-y-4">
        {fields.sort((a, b) => a.order - b.order).map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow">
            {editingId === item.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field Name (ID)</label>
                    <input
                      type="text"
                      value={editData?.name || ''}
                      onChange={(e) => setEditData({...editData!, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                    <select
                      value={editData?.type || 'text'}
                      onChange={(e) => setEditData({...editData!, type: e.target.value as any})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                    >
                      {fieldTypes.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      type="number"
                      value={editData?.order || 1}
                      onChange={(e) => setEditData({...editData!, order: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editData?.required || false}
                        onChange={(e) => setEditData({...editData!, required: e.target.checked})}
                        className="mr-2"
                      />
                      Required
                    </label>
                  </div>
                </div>

                {locales.map((locale) => (
                  <div key={locale.code} className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">{locale.label}</h4>
                    <input
                      type="text"
                      value={editData?.label[locale.code as keyof typeof editData.label] || ''}
                      onChange={(e) => setEditData({
                        ...editData!,
                        label: {...editData!.label, [locale.code]: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-2"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={editData?.placeholder[locale.code as keyof typeof editData.placeholder] || ''}
                      onChange={(e) => setEditData({
                        ...editData!,
                        placeholder: {...editData!.placeholder, [locale.code]: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      placeholder="Placeholder"
                    />
                  </div>
                ))}

                {editData?.type === 'select' && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dropdown Options (one per line)</label>
                    {locales.map((locale) => (
                      <div key={locale.code} className="mb-2">
                        <span className="text-sm text-gray-600">{locale.label}:</span>
                        <textarea
                          value={(editData?.options[locale.code as keyof typeof editData.options] || []).join('\n')}
                          onChange={(e) => updateOptions(locale.code, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl mt-1"
                          rows={3}
                          placeholder={"Option 1\nOption 2\nOption 3"}
                        />
                      </div>
                    ))}
                  </div>
                )}

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
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{item.label.en || item.label.zh}</h3>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">{item.type}</span>
                    {item.required && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded">Required</span>}
                  </div>
                  <p className="text-sm text-gray-500">Name: {item.name} | Order: {item.order}</p>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Field</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Name (ID)</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                <select
                  value={editData.type}
                  onChange={(e) => setEditData({...editData, type: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                >
                  {fieldTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input
                  type="number"
                  value={editData.order}
                  onChange={(e) => setEditData({...editData, order: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                />
              </div>
              <div className="flex items-center pt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editData.required}
                    onChange={(e) => setEditData({...editData, required: e.target.checked})}
                    className="mr-2"
                  />
                  Required
                </label>
              </div>
            </div>

            {locales.map((locale) => (
              <div key={locale.code} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="text-sm font-medium text-gray-600 mb-2">{locale.label}</h4>
                <input
                  type="text"
                  value={editData.label[locale.code as keyof typeof editData.label] || ''}
                  onChange={(e) => setEditData({
                    ...editData,
                    label: {...editData.label, [locale.code]: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-2"
                  placeholder="Label"
                />
                <input
                  type="text"
                  value={editData.placeholder[locale.code as keyof typeof editData.placeholder] || ''}
                  onChange={(e) => setEditData({
                    ...editData,
                    placeholder: {...editData.placeholder, [locale.code]: e.target.value}
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="Placeholder"
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
                Add Field
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
