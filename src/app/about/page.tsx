import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  Award,
  ArrowRight,
  MessageCircle,
  CheckCircle
} from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="pt-16 bg-gradient-to-br from-primary-50 to-accent-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About AiKang Medical Tour
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted bridge to world-class healthcare in China
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Who We Are
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  AiKang Medical Tour (爱康医旅) was founded with a mission to make premium healthcare accessible 
                  to international patients. We specialize in providing comprehensive medical tourism services 
                  for patients from the United States and Indonesia, offering a seamless journey from initial 
                  consultation to complete recovery.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  While we don't own hospitals ourselves, we've built strong partnerships with China's top 
                  JCI-accredited medical institutions, giving our patients access to cutting-edge technology 
                  and internationally trained specialists.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-primary-50 rounded-xl">
                    <p className="text-4xl font-bold text-primary-600">5000+</p>
                    <p className="text-gray-600">Patients Served</p>
                  </div>
                  <div className="text-center p-6 bg-accent-50 rounded-xl">
                    <p className="text-4xl font-bold text-accent-600">95%+</p>
                    <p className="text-gray-600">Success Rate</p>
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
                      <h3 className="font-semibold text-gray-900 mb-1">Our Mission</h3>
                      <p className="text-gray-600">
                        To provide international patients with access to China's world-class healthcare 
                        through a seamless, transparent, and personalized service experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Our Vision</h3>
                      <p className="text-gray-600">
                        To become the most trusted name in China medical tourism, setting new standards 
                        for patient care and international healthcare accessibility.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Our Values</h3>
                      <p className="text-gray-600">
                        Compassion, integrity, transparency, and excellence in everything we do. 
                        Your health and well-being are our top priorities.
                      </p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose AiKang?
              </h2>
              <p className="text-lg text-gray-600">
                What sets us apart from other medical tourism providers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Verified Partner Hospitals',
                  description: 'We only work with JCI-accredited hospitals that meet international standards for quality and safety.'
                },
                {
                  icon: Users,
                  title: 'Personal Care Coordinators',
                  description: 'Each patient receives a dedicated bilingual coordinator available 24/7 throughout their medical journey.'
                },
                {
                  icon: Award,
                  title: 'Transparent Pricing',
                  description: 'No hidden fees or surprises. We provide detailed cost estimates upfront before you travel.'
                },
                {
                  icon: Heart,
                  title: 'Comprehensive Aftercare',
                  description: 'Our support continues after you return home with telemedicine follow-ups and rehabilitation guidance.'
                },
                {
                  icon: Shield,
                  title: 'Zero Waiting Time',
                  description: 'Fast-track appointments with top specialists. Surgery scheduling within 7 days of arrival.'
                },
                {
                  icon: Users,
                  title: 'Complete Travel Support',
                  description: 'From visa assistance to accommodation and local transportation, we handle all logistics.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Promise to You
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                'Free initial medical consultation and second opinion',
                'Personalized treatment plans tailored to your needs',
                'Transparent pricing with no hidden costs',
                '24/7 support via WhatsApp and phone',
                'Airport pickup and local transportation assistance',
                'Accommodation recommendations near hospitals',
                'Interpretation services during medical appointments',
                'Post-treatment follow-up and telemedicine support',
                'Assistance with medical reports and documentation',
                'Recovery support and rehabilitation coordination'
              ].map((promise, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{promise}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Medical Journey?
            </h2>
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

      <Footer />
    </div>
  )
}