'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock,
  Send,
  CheckCircle
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="pt-16 bg-gradient-to-br from-primary-50 to-accent-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch for a free medical consultation. We're here to help 24/7.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  Whether you have questions about our services, need help planning your medical trip, 
                  or want a second opinion, our team is ready to assist you.
                </p>

                <div className="space-y-6 mb-8">
                  <a href="https://wa.me/8615711112233" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center space-x-4 p-4 bg-accent-50 rounded-xl hover:bg-accent-100 transition-colors">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp (Preferred)</p>
                      <p className="text-gray-600">+86 15711112233</p>
                    </div>
                  </a>

                  <a href="tel:+8615711112233" 
                     className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">+86 15711112233</p>
                      <p className="text-gray-600">+86 15855159472</p>
                    </div>
                  </a>

                  <a href="mailto:info@aikangmedtour.com" 
                     className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">info@aikangmedtour.com</p>
                    </div>
                  </a>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Working Hours</p>
                      <p className="text-gray-600">24/7 Support Available</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-primary-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Quick Response Guarantee</h3>
                  <p className="text-gray-600 text-sm">
                    For WhatsApp inquiries, we typically respond within 1 hour. 
                    Email inquiries are answered within 24 hours.
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-2xl p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-accent-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
                      <p className="text-gray-600 mb-6">
                        Your inquiry has been submitted successfully. Our medical team will review your case 
                        and contact you within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-primary-600 font-semibold hover:text-primary-700"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Send Us an Inquiry
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone/WhatsApp
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                              placeholder="+1 234 567 8900"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Country *
                            </label>
                            <select
                              name="country"
                              required
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            >
                              <option value="">Select country</option>
                              <option value="United States">United States</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Service Interest
                            </label>
                            <select
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            >
                              <option value="">Select service</option>
                              <option value="Cardiac Surgery">Cardiac Surgery</option>
                              <option value="Oncology">Oncology</option>
                              <option value="Orthopedics">Orthopedics</option>
                              <option value="Neurology">Neurology</option>
                              <option value="Ophthalmology">Ophthalmology</option>
                              <option value="Fertility">Fertility Treatment</option>
                              <option value="General Surgery">General Surgery</option>
                              <option value="Preventive Health">Preventive Health</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Message *
                          </label>
                          <textarea
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                            placeholder="Please describe your medical condition and what you're looking for..."
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                        >
                          <Send className="w-5 h-5" />
                          <span>Submit Inquiry</span>
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: 'How do I get started with my medical trip to China?',
                  a: 'Simply contact us via WhatsApp or email with your medical reports. Our team will arrange consultations with top Chinese specialists and provide you with treatment options and cost estimates within 24 hours.'
                },
                {
                  q: 'What is the typical cost savings compared to treatment in the US?',
                  a: 'Most medical procedures in China cost 60-80% less than in the United States, while maintaining equal or better quality of care. For example, heart bypass surgery costs $12,000-25,000 in China vs $100,000-150,000 in the US.'
                },
                {
                  q: 'How quickly can I schedule surgery after contacting you?',
                  a: 'We can typically arrange surgery appointments within 7 days of your arrival in China. Our zero waiting time policy is one of the key advantages of choosing medical treatment in China.'
                },
                {
                  q: 'Do you assist with visa and travel arrangements?',
                  a: 'Yes, we provide comprehensive assistance including medical visa invitation letters, flight bookings, airport pickup, and accommodation arrangements near our partner hospitals.'
                },
                {
                  q: 'What language support do you provide?',
                  a: 'All our care coordinators are bilingual. We also provide professional medical interpretation services during all hospital visits and consultations to ensure clear communication with your medical team.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}