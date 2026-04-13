'use client'

import {useState} from 'react';
import {Phone, Mail, MessageCircle, Clock, Send} from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function ContactPage({params}: {params: {locale: string}}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: '',
  });
  const t = useTranslations('contact');
  const tServices = useTranslations('services');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const services = [
    tServices('cardiac.title'),
    tServices('oncology.title'),
    tServices('orthopedics.title'),
    tServices('neurology.title'),
    tServices('ophthalmology.title'),
    tServices('fertility.title'),
    tServices('general.title'),
    tServices('preventive.title'),
  ];

  return (
    <main>
      <section className="pt-16 bg-gradient-to-br from-primary-50 to-accent-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('getInTouch')}</h2>
              <p className="text-gray-600 mb-8">
                {t('getInTouchDesc')}
              </p>

              <div className="space-y-6 mb-8">
                <a
                  href="https://wa.me/8615711112233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-accent-50 rounded-xl hover:bg-accent-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('whatsapp.label')}</p>
                    <p className="text-gray-600">{t('whatsapp.value')}</p>
                  </div>
                </a>

                <a
                  href="tel:+8615711112233"
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('phone.label')}</p>
                    <p className="text-gray-600">{t('phone.value1')}</p>
                  </div>
                </a>

                <a
                  href="mailto:info@aikangmedtour.com"
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('email.label')}</p>
                    <p className="text-gray-600">{t('email.value')}</p>
                  </div>
                </a>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('hours.label')}</p>
                    <p className="text-gray-600">{t('hours.value')}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">{t('quickResponse.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('quickResponse.description')}
                </p>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-2xl p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-accent-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('form.successTitle')}</h3>
                    <p className="text-gray-600 mb-6">{t('form.successMessage')}</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-primary-600 font-semibold hover:text-primary-700"
                    >
                      {t('form.submitAnother')}
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.name')} *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          placeholder={t('form.namePlaceholder')}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.email')} *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            placeholder={t('form.emailPlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.phone')}</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            placeholder={t('form.phonePlaceholder')}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.country')} *</label>
                          <select
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          >
                            <option value="">{t('form.countrySelect')}</option>
                            <option value="United States">{t('form.usa')}</option>
                            <option value="Indonesia">{t('form.indonesia')}</option>
                            <option value="Other">{t('form.other')}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.service')}</label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          >
                            <option value="">{t('form.serviceSelect')}</option>
                            {services.map((service, index) => (
                              <option key={index} value={service}>{service}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.message')} *</label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                          placeholder={t('form.messagePlaceholder')}
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                      >
                        <Send className="w-5 h-5" />
                        <span>{t('form.submit')}</span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
