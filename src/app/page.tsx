import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Beer, UtensilsCrossed, Tv, Users, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center">
          <Image
            src="https://www.pubsherlockholmes.com/public/theme/images/pub1.png"
            alt="Sherlock Holmes Pub Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pub-green-dark/90 to-pub-green-dark/70" />

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance">
              Welcome to Sherlock Holmes Pub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-neutral-200">
              Italy's First Authentic English Pub Since 1995
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" className="btn-primary text-lg">
                View Our Menu
              </Link>
              <Link href="/reservations" className="btn-outline text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-pub-green">
                Book a Table
              </Link>
            </div>
          </div>
        </section>

        {/* Historic Significance */}
        <section className="py-16 bg-pub-burgundy-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block bg-pub-brass text-pub-wood-dark font-bold px-6 py-2 rounded-full mb-4">
              Est. 1995
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              A Piece of England in Italy
            </h2>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
              Built entirely by Torrys from Birmingham, UK, we brought authentic British pub culture to Reggio Emilia.
              For nearly three decades, we've been serving the finest beers, spirits, and traditional pub fare to locals and visitors alike.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-heading">What Makes Us Special</h2>
              <p className="section-subheading">Experience authentic British hospitality</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card text-center hover:shadow-xl transition-shadow">
                <Beer className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Wide Beer Selection</h3>
                <p className="text-neutral-600">
                  From classic British ales to international craft beers, we have something for every beer enthusiast.
                </p>
              </div>

              <div className="card text-center hover:shadow-xl transition-shadow">
                <UtensilsCrossed className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Traditional Pub Fare</h3>
                <p className="text-neutral-600">
                  Enjoy our famous burgers, sandwiches, and classic English pub dishes made with quality ingredients.
                </p>
              </div>

              <div className="card text-center hover:shadow-xl transition-shadow">
                <Tv className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Sky Sports</h3>
                <p className="text-neutral-600">
                  Watch all major sporting events on our big screens. Football, rugby, cricket - we've got it all!
                </p>
              </div>

              <div className="card text-center hover:shadow-xl transition-shadow">
                <Users className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Events & Parties</h3>
                <p className="text-neutral-600">
                  Host your birthday, corporate event, or private party in an authentic English pub atmosphere.
                </p>
              </div>

              <div className="card text-center hover:shadow-xl transition-shadow">
                <Calendar className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Live Events</h3>
                <p className="text-neutral-600">
                  Live music, quiz nights, and special events throughout the year. Check our events calendar!
                </p>
              </div>

              <div className="card text-center hover:shadow-xl transition-shadow">
                <MapPin className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Great Location</h3>
                <p className="text-neutral-600">
                  Just 2km from the historic city center on Via Emilia, with outdoor terrace seating available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Menu Items */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-heading">Signature Dishes & Drinks</h2>
              <p className="section-subheading">A taste of what we offer</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop"
                    alt="Classic Burger"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-serif font-bold text-pub-green">Classic Burger</h3>
                <p className="text-neutral-600 text-sm">Juicy beef patty with all the fixings</p>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&h=500&fit=crop"
                    alt="Craft Beer Selection"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-serif font-bold text-pub-green">Craft Beers</h3>
                <p className="text-neutral-600 text-sm">Rotating selection of premium beers</p>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=500&fit=crop"
                    alt="Cocktails"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-serif font-bold text-pub-green">Craft Cocktails</h3>
                <p className="text-neutral-600 text-sm">Expertly mixed classic cocktails</p>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1619740455993-9e4e3c9c9f1f?w=500&h=500&fit=crop"
                    alt="Pub Appetizers"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-serif font-bold text-pub-green">Appetizers</h3>
                <p className="text-neutral-600 text-sm">Perfect starters to share</p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/menu" className="btn-primary">
                View Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="py-16 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-heading">Step Inside</h2>
              <p className="section-subheading">Experience our authentic pub atmosphere</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="aspect-video relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={`https://www.pubsherlockholmes.com/public/theme/images/pub${num}.png`}
                    alt={`Pub interior ${num}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-pub-green text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready for a Great Evening?
            </h2>
            <p className="text-xl mb-8 text-neutral-200">
              Book your table now and experience the finest English pub in Italy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservations" className="btn-secondary text-lg">
                Make a Reservation
              </Link>
              <a href={`tel:+390522331518`} className="btn-outline text-lg border-white text-white hover:bg-white hover:text-pub-green">
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
