import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
  MessageCircle
} from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Heart,
      title: 'Cardiac Surgery',
      description: 'World-class heart care including bypass surgery, valve replacement, and minimally invasive procedures.',
      features: ['Coronary artery bypass grafting (CABG)', 'Heart valve repair/replacement', 'Minimally invasive cardiac surgery', 'Arrhythmia treatment'],
      priceRange: '$12,000 - $25,000',
      savings: 'Save 70-80% vs US'
    },
    {
      icon: Stethoscope,
      title: 'Oncology',
      description: 'Comprehensive cancer care from diagnosis to treatment and rehabilitation with cutting-edge technology.',
      features: ['Cancer screening & diagnosis', 'Surgical oncology', 'Chemotherapy & immunotherapy', 'Precision medicine'],
      priceRange: '$8,000 - $50,000',
      savings: 'Save 60-75% vs US'
    },
    {
      icon: Bone,
      title: 'Orthopedics',
      description: 'Advanced orthopedic treatments including joint replacement, spine surgery, and sports medicine.',
      features: ['Hip & knee replacement', 'Spine surgery', 'Sports medicine', 'Arthroscopic procedures'],
      priceRange: '$6,000 - $20,000',
      savings: 'Save 65-80% vs US'
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Expert neurological care for conditions affecting the brain, spine, and nervous system.',
      features: ['Brain tumor treatment', 'Spine surgery', 'Stroke rehabilitation', 'Deep brain stimulation'],
      priceRange: '$10,000 - $45,000',
      savings: 'Save 60-75% vs US'
    },
    {
      icon: Eye,
      title: 'Ophthalmology',
      description: 'State-of-the-art eye treatments including cataract surgery, LASIK, and retinal procedures.',
      features: ['Cataract surgery', 'LASIK & refractive surgery', 'Retinal treatment', 'Cornea transplant'],
      priceRange: '$2,000 - $8,000',
      savings: 'Save 70-85% vs US'
    },
    {
      icon: Baby,
      title: 'Fertility Treatment',
      description: 'Advanced reproductive medicine with high success rates at world-class fertility centers.',
      features: ['IVF & ICSI', 'Egg & sperm donation', 'Surrogacy services', 'Preimplantation genetic testing'],
      priceRange: '$8,000 - $25,000',
      savings: 'Save 50-70% vs US'
    },
    {
      icon: Microscope,
      title: 'General Surgery',
      description: 'Comprehensive general surgical procedures performed by experienced surgeons.',
      features: ['Gastric surgery', 'Thyroid surgery', 'Hernia repair', 'Gallbladder removal'],
      priceRange: '$3,000 - $12,000',
      savings: 'Save 70-80% vs US'
    },
    {
      icon: Shield,
      title: 'Preventive Health',
      description: 'Comprehensive health checkups and wellness programs for early detection and prevention.',
      features: ['Executive health screening', 'Cancer screening', 'Cardiac assessment', 'Genetic testing'],
      priceRange: '$500 - $3,000',
      savings: 'Save 60-80% vs US'
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="pt-16 bg-gradient-to-br from-primary-50 to-accent-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Medical Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access world-class healthcare in China at a fraction of the cost. 
              We partner with top JCI-accredited hospitals to provide exceptional care.
            </p>
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
                          <p className="text-xs text-gray-500">Typical Cost Range</p>
                          <p className="text-lg font-bold text-primary-600">{service.priceRange}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">vs US</p>
                          <p className="text-sm font-semibold text-accent-600">{service.savings}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary-600 px-8 py-4">
                    <a href="/contact" className="flex items-center justify-center space-x-2 text-white font-semibold">
                      <span>Get Free Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Service Process
              </h2>
              <p className="text-lg text-gray-600">
                From initial consultation to recovery, we handle every detail
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Free Consultation',
                  description: 'Submit your medical reports and receive opinions from top Chinese specialists within 24 hours.'
                },
                {
                  step: '02',
                  title: 'Treatment Plan',
                  description: 'Receive a detailed treatment plan including hospital selection, doctor profiles, and cost estimates.'
                },
                {
                  step: '03',
                  title: 'Travel Arrangements',
                  description: 'We handle visa assistance, flight bookings, airport pickup, and accommodation arrangements.'
                },
                {
                  step: '04',
                  title: 'Treatment & Recovery',
                  description: 'Receive treatment at world-class facilities with your personal care coordinator by your side.'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
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
              <a
                href="/contact"
                className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
              >
                <span>Contact Form</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}