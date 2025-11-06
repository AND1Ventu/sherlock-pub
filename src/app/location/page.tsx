import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Car, Train, Bus } from 'lucide-react';
import { PUB_INFO } from '@/types';

export default function LocationPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-pub-green text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Visit Us
            </h1>
            <p className="text-xl">Just 2km from Reggio Emilia's historic city center</p>
          </div>
        </section>

        {/* Contact & Hours */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="card text-center">
                <MapPin className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Address</h3>
                <p className="text-neutral-600">{PUB_INFO.location}</p>
                <a
                  href="https://maps.google.com/?q=Via+Louis+Pasteur+13,+42122+Reggio+Emilia,+Italy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mt-4 inline-block text-sm py-2 px-4"
                >
                  Get Directions
                </a>
              </div>

              <div className="card text-center">
                <Phone className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Phone</h3>
                <a href={`tel:${PUB_INFO.phone}`} className="text-neutral-600 hover:text-pub-brass text-lg">
                  {PUB_INFO.phone}
                </a>
                <div className="mt-4">
                  <Mail className="w-6 h-6 text-pub-brass mx-auto mb-2" />
                  <a href={`mailto:${PUB_INFO.email}`} className="text-neutral-600 hover:text-pub-brass text-sm">
                    {PUB_INFO.email}
                  </a>
                </div>
              </div>

              <div className="card text-center">
                <Clock className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Opening Hours</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  {Object.entries(PUB_INFO.hours).map(([day, hours]) => (
                    <li key={day} className="flex justify-between px-4">
                      <span className="font-medium">{day}:</span>
                      <span>{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-16 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-pub-green text-center mb-8">
              Find Us on the Map
            </h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.7!2d10.6297!3d44.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQyJzAwLjAiTiAxMMKwMzcnNDcuMCJF!5e0!3m2!1sen!2sit!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* How to Get Here */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-pub-green text-center mb-12">
              How to Get Here
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card">
                <Car className="w-12 h-12 text-pub-brass mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-3">By Car</h3>
                <p className="text-neutral-600 mb-4">
                  We're located on Via Louis Pasteur, just off Via Emilia (SS9). Free parking available nearby.
                </p>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• From A1 Motorway: Exit at Reggio Emilia (15 min)</li>
                  <li>• From City Center: 2km via Via Emilia (5 min)</li>
                  <li>• Parking: Street parking available</li>
                </ul>
              </div>

              <div className="card">
                <Bus className="w-12 h-12 text-pub-brass mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-3">By Bus</h3>
                <p className="text-neutral-600 mb-4">
                  Several local bus lines stop near the pub on Via Emilia.
                </p>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• Lines: 1, 7, 9</li>
                  <li>• Stop: Via Emilia/Pasteur</li>
                  <li>• Walk: 2 minutes from bus stop</li>
                </ul>
              </div>

              <div className="card">
                <Train className="w-12 h-12 text-pub-brass mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-3">By Train</h3>
                <p className="text-neutral-600 mb-4">
                  Reggio Emilia AV Mediopadana high-speed train station is nearby.
                </p>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• From Station: 10 min by taxi</li>
                  <li>• City Center Station: 15 min walk + 5 min by bus</li>
                  <li>• Taxi: Available at station</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-pub-burgundy text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Visit?
            </h2>
            <p className="text-xl mb-8 text-neutral-200">
              Book your table in advance to ensure availability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/reservations" className="btn-secondary text-lg">
                Make a Reservation
              </a>
              <a href={`tel:${PUB_INFO.phone}`} className="btn-outline text-lg border-white text-white hover:bg-white hover:text-pub-burgundy">
                Call Us Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
