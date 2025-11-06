import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, Users, MapPin, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[400px] flex items-center justify-center">
          <Image
            src="https://www.pubsherlockholmes.com/public/theme/images/ingresso.png"
            alt="Sherlock Holmes Pub Entrance"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-pub-green-dark/80" />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Our Story
            </h1>
            <p className="text-xl">Nearly three decades of British pub tradition in Italy</p>
          </div>
        </section>

        {/* Main Story */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-center mb-12">
                <div className="inline-block bg-pub-brass text-pub-wood-dark font-bold px-6 py-2 rounded-full mb-6">
                  Est. 1995
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-pub-green mb-4">
                  A British Legacy in Reggio Emilia
                </h2>
              </div>

              <div className="space-y-6 text-neutral-700 text-lg leading-relaxed">
                <p>
                  In 1995, something extraordinary happened in Reggio Emilia. The Vuolo family, with a passion for British culture
                  and hospitality, embarked on an ambitious project: to create Italy's first authentic English pub.
                </p>

                <p>
                  Not content with merely recreating the aesthetic, the Vuolos brought in skilled craftsmen - the Torrys from
                  Birmingham, England - to construct the pub using traditional British methods and authentic materials. Every
                  wooden beam, every brass fixture, every detail was carefully selected to transport guests to a genuine English
                  pub experience.
                </p>

                <p>
                  The result was Sherlock Holmes Pub, named after Britain's most famous detective. From the moment you step
                  through our doors, you're transported to a traditional British pub, complete with dark wood paneling, cozy
                  booths, and that unmistakable warm atmosphere that makes English pubs so beloved around the world.
                </p>

                <p>
                  For nearly three decades, we've been serving the people of Reggio Emilia and visitors from around the world.
                  We've watched generations grow up with us, celebrated countless birthdays and special occasions, and become
                  a cornerstone of the local social scene.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-pub-green text-center mb-12">
              What We Stand For
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card text-center">
                <Award className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Authenticity</h3>
                <p className="text-neutral-600">
                  Built by British craftsmen using traditional methods, we're the real deal.
                </p>
              </div>

              <div className="card text-center">
                <Users className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Family</h3>
                <p className="text-neutral-600">
                  A family business that treats every guest like family.
                </p>
              </div>

              <div className="card text-center">
                <Clock className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Tradition</h3>
                <p className="text-neutral-600">
                  Honoring British pub culture while embracing Italian hospitality.
                </p>
              </div>

              <div className="card text-center">
                <MapPin className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Community</h3>
                <p className="text-neutral-600">
                  A gathering place for locals and visitors for nearly 30 years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-pub-green text-center mb-12">
              Our Journey
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-3xl font-serif font-bold text-pub-brass">1995</span>
                </div>
                <div className="flex-grow border-l-4 border-pub-brass pl-8 pb-8">
                  <h3 className="text-xl font-bold text-pub-green mb-2">The Beginning</h3>
                  <p className="text-neutral-600">
                    Sherlock Holmes Pub opens its doors as Italy's first authentic English pub, built entirely
                    by craftsmen from Birmingham, UK.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-3xl font-serif font-bold text-pub-brass">2000s</span>
                </div>
                <div className="flex-grow border-l-4 border-pub-brass pl-8 pb-8">
                  <h3 className="text-xl font-bold text-pub-green mb-2">Growing Reputation</h3>
                  <p className="text-neutral-600">
                    Becomes a local landmark and the go-to destination for sports viewing, live events,
                    and authentic British pub experience in Reggio Emilia.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-3xl font-serif font-bold text-pub-brass">2010s</span>
                </div>
                <div className="flex-grow border-l-4 border-pub-brass pl-8 pb-8">
                  <h3 className="text-xl font-bold text-pub-green mb-2">Expanding Offerings</h3>
                  <p className="text-neutral-600">
                    Enhanced menu, outdoor terrace, and established reputation for hosting memorable
                    private events and parties.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-3xl font-serif font-bold text-pub-brass">Today</span>
                </div>
                <div className="flex-grow border-l-4 border-pub-brass pl-8 pb-8">
                  <h3 className="text-xl font-bold text-pub-green mb-2">A Local Institution</h3>
                  <p className="text-neutral-600">
                    Nearly 30 years strong, continuing the Vuolo family tradition of excellence and
                    authentic British hospitality in the heart of Emilia-Romagna.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Vuolo Family */}
        <section className="py-16 bg-pub-burgundy-dark text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              The Vuolo Family
            </h2>
            <p className="text-xl text-neutral-200 mb-8">
              For nearly three decades, our family has been dedicated to bringing you the finest English pub
              experience in Italy. We take pride in every pint poured, every meal served, and every smile shared
              within these historic walls.
            </p>
            <p className="text-lg text-neutral-300">
              "Our dream was to create a place where people could gather, celebrate, and feel at home.
              Nearly 30 years later, that dream lives on every single day."
            </p>
            <p className="mt-4 text-pub-brass font-serif text-lg">
              - The Vuolo Family
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-pub-green text-center mb-12">
              Inside Our Pub
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="aspect-video relative overflow-hidden rounded-lg shadow-xl">
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
      </main>
      <Footer />
    </>
  );
}
