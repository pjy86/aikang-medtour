import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {
  Heart,
  Stethoscope,
  Activity,
  Shield,
  Microscope,
  Brain,
  Eye,
  Bone,
  Baby,
  ArrowRight,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';

export default async function ServicesPage({params}: {params: {locale: string}}) {
  setRequestLocale(params.locale);
  const t = await getTranslations('services');

  const services = [
    {
      icon: Heart,
      title: t('cardiac.title'),
      description: t('cardiac.description'),
      features: t.raw('cardiac.features') as string[],
      priceRange: '$12,000 - $25,000',
      savings: t('save'),
    },
    {
      icon: Stethoscope,
      title: t('oncology.title'),
      description: t('oncology.description'),
      features: t.raw('oncology.features') as string[],
      priceRange: '$8,000 - $50,000',
      savings: 'Save 60-75% vs US',
    },
    {
      icon: Bone,
      title: t('orthopedics.title'),
      description: t('orthopedics.description'),
      features: t.raw('orthopedics.features') as string[],
      priceRange: '$6,000 - $20,000',
      savings: 'Save 65-80% vs US',
    },
    {
      icon: Brain,
      title: t('neurology.title'),
      description: t('neurology.description'),
      features: t.raw('neurology.features') as string[],
      priceRange: '$10,000 - $45,000',
      savings: 'Save 60-75% vs US',
    },
    {
      icon: Eye,
      title: t('ophthalmology.title'),
      description: t('ophthalmology.description'),
      features: t.raw('ophthalmology.features') as string[],
      priceRange: '$2,000 - $8,000',
      savings: 'Save 70-85% vs US',
    },
    {
      icon: Baby,
      title: t('fertility.title'),
      description: t('fertility.description'),
      features: t.raw('fertility.features') as string[],
      priceRange: '$8,000 - $25,000',
      savings: 'Save 50-70% vs US',
    },
    {
      icon: Microscope,
      title: t('general.title'),
      description: t('general.description'),
      features: t.raw('general.features') as string[],
      priceRange: '$3,000 - $12,000',
      savings: t('save'),
    },
    {
      icon: Shield,
      title: t('preventive.title'),
      description: t('preventive.description'),
      features: t.raw('preventive.features') as string[],
      priceRange: '$500 - $3,000',
      savings: 'Save 60-80% vs US',
    },
  ];

  return (
    <main>
      <section className="pt-16 bg-gradient-to-br from-primary-50 to-accent-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">{t('typicalCost')}</p>
                        <p className="text-lg font-bold text-primary-600">{service.priceRange}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{t('vsUS')}</p>
                        <p className="text-sm font-semibold text-accent-600">{service.savings}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-primary-600 px-8 py-4">
                  <Link
                    href={`/${params.locale}/contact`}
                    className="flex items-center justify-center space-x-2 text-white font-semibold"
                  >
                    <span>{t('getQuote')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('title')}</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Chat with us on WhatsApp for instant consultation and personalized treatment recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/8615711112233"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-accent-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-600 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href={`/${params.locale}/contact`}
              className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              <span>Contact Form</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}