import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  MessageCircle, 
  Shield, 
  Clock, 
  Star, 
  Heart, 
  Activity, 
  Stethoscope, 
  Plane,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Phone
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="relative pt-16 min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Star className="w-4 h-4" />
                  <span>Trusted by 5000+ International Patients</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Your Gateway to <span className="text-primary-600">Premium Healthcare</span> in China
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We provide comprehensive medical tourism services for patients from the US and Indonesia. 
                  Experience world-class treatment with zero waiting time and significant cost savings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/8615711112233"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-accent-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-600 transition-all hover:shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Free Consultation</span>
                  </a>
                  <Link
                    href="/services"
                    className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-primary-500 hover:text-primary-600 transition-all"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl p-8">
                  <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <Activity className="w-8 h-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Heart Bypass Surgery</h3>
                        <p className="text-sm text-gray-500">Top Chinese Hospital</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Cost in China</p>
                        <p className="text-xl font-bold text-accent-600">$15,000</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Cost in US</p>
                        <p className="text-xl font-bold text-gray-400 line-through">$100,000+</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-3">
                        {[1,2,3].map((i) => (
                          <div key={i} className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{i}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">95%+ Success Rate</p>
                        <p className="text-sm text-gray-500">Verified by international patients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Patients Choose <span className="text-primary-600">AiKang</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We handle everything so you can focus on your health
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'World-Class Hospitals',
                  description: 'Partnered with JCI-accredited top hospitals in China featuring cutting-edge medical technology and internationally trained specialists.'
                },
                {
                  icon: Clock,
                  title: 'Zero Waiting Time',
                  description: 'Surgery appointment within 7 days. No long queues or waiting lists that are common in other countries.'
                },
                {
                  icon: CheckCircle,
                  title: 'Significant Savings',
                  description: 'Save 70-80% on medical procedures while receiving equal or better quality care compared to the US.'
                },
                {
                  icon: Users,
                  title: 'Personal Care Coordinator',
                  description: 'Dedicated bilingual coordinator accompanies you throughout your entire medical journey from consultation to recovery.'
                },
                {
                  icon: Plane,
                  title: 'Complete Travel Support',
                  description: 'Visa assistance, airport pickup, accommodation arrangement, and interpretation services all included.'
                },
                {
                  icon: Award,
                  title: 'Post-Treatment Follow-up',
                  description: 'Continuously monitor your recovery after returning home with regular check-ins and telemedicine support.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
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

        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Medical Services
              </h2>
              <p className="text-lg text-primary-100 max-w-2xl mx-auto">
                Comprehensive healthcare solutions tailored to your needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: 'Cardiac Surgery', desc: 'Heart bypass, valve replacement, minimally invasive procedures' },
                { icon: Stethoscope, title: 'Oncology', desc: 'Cancer diagnosis, treatment, surgery, and rehabilitation' },
                { icon: Activity, title: 'Orthopedics', desc: 'Joint replacement, spine surgery, sports medicine' },
                { icon: Shield, title: 'Preventive Health', desc: 'Comprehensive health checkups and wellness programs' },
              ].map((service, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
                  <service.icon className="w-10 h-10 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-primary-100 text-sm">{service.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Patients Say
              </h2>
              <p className="text-lg text-gray-600">
                Real experiences from international patients
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Michael Thompson',
                  country: 'USA',
                  text: 'The care I received in China exceeded all expectations. My heart surgery was performed by a world-renowned specialist at a fraction of the US cost. The personal attention from AiKang made everything seamless.',
                  procedure: 'Heart Bypass Surgery'
                },
                {
                  name: 'Sarah Wijaya',
                  country: 'Indonesia',
                  text: 'From the moment I arrived, everything was perfectly organized. The hospital facilities were top-notch, and my coordinator was always available. I saved over $80,000 compared to getting treatment in Singapore.',
                  procedure: 'Spinal Surgery'
                },
                {
                  name: 'Robert Chen',
                  country: 'USA',
                  text: 'AiKang made my medical journey stress-free. The quality of care was exceptional, and being able to recover in a peaceful environment while having access to modern facilities was invaluable.',
                  procedure: 'Joint Replacement'
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.country} • {testimonial.procedure}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Start Your Medical Journey Today
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Get a free consultation and personalized treatment plan. Our team is available 24/7 on WhatsApp to answer your questions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-accent-500" />
                    <span className="text-gray-700">Free medical opinion within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-accent-500" />
                    <span className="text-gray-700">Detailed cost estimates from top hospitals</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-accent-500" />
                    <span className="text-gray-700">Assistance with travel arrangements and visa</span>
                  </div>
                </div>
                <div className="mt-8 flex items-center space-x-4">
                  <a
                    href="https://wa.me/8615711112233"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-accent-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <a href="tel:+8615711112233" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                    <Phone className="w-5 h-5" />
                    <span>+86 15711112233</span>
                  </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Country</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none">
                      <option>United States</option>
                      <option>Indonesia</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medical Service Interested In</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none">
                      <option>Cardiac Surgery</option>
                      <option>Oncology</option>
                      <option>Orthopedics</option>
                      <option>Preventive Health</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                      placeholder="Tell us about your medical needs..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}