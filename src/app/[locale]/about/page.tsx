import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Target, Eye, Heart, Shield, Users, Award, CheckCircle, MessageCircle} from 'lucide-react';

export default async function AboutPage({params}: {params: {locale: string}}) {
  setRequestLocale(params.locale);
  const t = await getTranslations('about');

  return (
    <main>
      <section className="pt-16 bg-gradient-to-br from-primary-50 to-accent-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('whoWeAre.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Your trusted bridge to world-class healthcare in China</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('whoWeAre.title')}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t('whoWeAre.p1')}</p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t('whoWeAre.p2')}</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-primary-50 rounded-xl">
                  <p className="text-4xl font-bold text-primary-600">{t('stats.patients')}</p>
                  <p className="text-gray-600">{t('stats.patientsLabel')}</p>
                </div>
                <div className="text-center p-6 bg-accent-50 rounded-xl">
                  <p className="text-4xl font-bold text-accent-600">{t('stats.success')}</p>
                  <p className="text-gray-600">{t('stats.successLabel')}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('mission.title')}</h3>
                    <p className="text-gray-600">{t('mission.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('vision.title')}</h3>
                    <p className="text-gray-600">{t('vision.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('values.title')}</h3>
                    <p className="text-gray-600">{t('values.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('whyChoose.title')}</h2>
            <p className="text-lg text-gray-600">{t('whyChoose.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('whyChoose.verified.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('whyChoose.verified.description')}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('whyChoose.personal.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('whyChoose.personal.description')}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('whyChoose.transparent.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('whyChoose.transparent.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Medical Journey?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation today. We're available 24/7 on WhatsApp.
          </p>
          <a
            href="https://wa.me/8615711112233"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-accent-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-600 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat with Us Now</span>
          </a>
        </div>
      </section>
    </main>
  );
}