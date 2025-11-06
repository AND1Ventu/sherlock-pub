import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, TvMinimal, Users, Music, PartyPopper, Trophy } from 'lucide-react';

const upcomingEvents = [
  {
    title: 'Premier League Nights',
    titleIt: 'Serate Premier League',
    date: 'Every Weekend',
    description: 'Watch all the major Premier League matches on our big screens with Sky Sports',
    descriptionIt: 'Guarda tutte le principali partite di Premier League sui nostri maxischermi con Sky Sports',
    icon: TvMinimal,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=400&fit=crop',
  },
  {
    title: 'Live Music Friday',
    titleIt: 'Venerdì Musica Live',
    date: 'Every Friday',
    description: 'Enjoy live performances from local and international artists',
    descriptionIt: 'Goditi esibizioni dal vivo di artisti locali e internazionali',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600&h=400&fit=crop',
  },
  {
    title: 'Quiz Night',
    titleIt: 'Serata Quiz',
    date: 'First Thursday of Month',
    description: 'Test your knowledge with friends in our popular pub quiz',
    descriptionIt: 'Metti alla prova le tue conoscenze con gli amici nel nostro popolare quiz da pub',
    icon: Trophy,
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=400&fit=crop',
  },
];

export default function EventsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-pub-green text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-6 text-pub-brass" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Events & Entertainment
            </h1>
            <p className="text-xl">Live sports, music, and unforgettable nights at the pub</p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-heading">Regular Events</h2>
              <p className="section-subheading">Join us for these recurring favorites</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={index} className="card hover:shadow-xl transition-shadow">
                    <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Icon className="w-10 h-10 text-pub-brass mb-3" />
                    <h3 className="text-2xl font-serif font-bold text-pub-green mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-neutral-500 italic mb-3">{event.titleIt}</p>
                    <p className="text-pub-brass font-bold mb-3">{event.date}</p>
                    <p className="text-neutral-600 mb-2">{event.description}</p>
                    <p className="text-sm text-neutral-500 italic">{event.descriptionIt}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sports Viewing */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <TvMinimal className="w-12 h-12 text-pub-brass mb-4" />
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-pub-green mb-4">
                  Watch Live Sports on Sky
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  As a true British pub, we're passionate about sports! Watch all major sporting events on our
                  big screens with Sky Sports coverage.
                </p>
                <ul className="space-y-3 text-neutral-700 mb-6">
                  <li className="flex items-start">
                    <span className="text-pub-brass mr-2">•</span>
                    <span>Premier League, Champions League, and European Football</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pub-brass mr-2">•</span>
                    <span>Rugby Six Nations and World Cup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pub-brass mr-2">•</span>
                    <span>Cricket Test Matches and ODIs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pub-brass mr-2">•</span>
                    <span>Formula 1, Tennis Grand Slams, and more</span>
                  </li>
                </ul>
                <p className="text-neutral-600">
                  Book a table for major matches to guarantee your spot!
                </p>
              </div>
              <div className="aspect-video relative overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop"
                  alt="Sports Viewing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Private Events */}
        <section className="py-16 bg-pub-burgundy text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Users className="w-16 h-16 mx-auto mb-6 text-pub-brass" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Host Your Event at Our Pub
              </h2>
              <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
                Looking for a unique venue for your birthday party, corporate event, or private gathering?
                Our authentic English pub provides the perfect atmosphere.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-pub-burgundy-light rounded-lg p-6">
                <PartyPopper className="w-10 h-10 text-pub-brass mb-3" />
                <h3 className="text-xl font-serif font-bold mb-2">Birthday Parties</h3>
                <p className="text-neutral-200">
                  Celebrate your special day with friends in a warm, welcoming atmosphere with great food and drinks.
                </p>
              </div>

              <div className="bg-pub-burgundy-light rounded-lg p-6">
                <Users className="w-10 h-10 text-pub-brass mb-3" />
                <h3 className="text-xl font-serif font-bold mb-2">Corporate Events</h3>
                <p className="text-neutral-200">
                  Team building, after-work gatherings, or client entertainment in a professional yet relaxed setting.
                </p>
              </div>

              <div className="bg-pub-burgundy-light rounded-lg p-6">
                <Calendar className="w-10 h-10 text-pub-brass mb-3" />
                <h3 className="text-xl font-serif font-bold mb-2">Private Bookings</h3>
                <p className="text-neutral-200">
                  Book the entire venue or a private section for your exclusive event with customized menu options.
                </p>
              </div>
            </div>

            <div className="text-center">
              <a href="mailto:info@pubsherlockholmes.com?subject=Private Event Inquiry" className="btn-secondary text-lg">
                Inquire About Private Events
              </a>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-pub-green text-center mb-12">
              Event Atmosphere
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[2, 3, 5].map((num) => (
                <div key={num} className="aspect-video relative overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src={`https://www.pubsherlockholmes.com/public/theme/images/pub${num}.png`}
                    alt={`Event atmosphere ${num}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-pub-green text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Join Us for the Next Event
            </h2>
            <p className="text-xl mb-8 text-neutral-200">
              Book your table or inquire about hosting your own event
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/reservations" className="btn-secondary text-lg">
                Book a Table
              </a>
              <a href="tel:+390522331518" className="btn-outline text-lg border-white text-white hover:bg-white hover:text-pub-green">
                Call Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
