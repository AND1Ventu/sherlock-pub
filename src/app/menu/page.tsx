import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QrCode } from 'lucide-react';

// Sample menu data - will be replaced with database data
const menuCategories = [
  {
    id: '1',
    name: 'Appetizers',
    nameIt: 'Stuzzicherie',
    items: [
      {
        name: 'Nachos Supreme',
        nameIt: 'Nachos Supremi',
        description: 'Crispy tortilla chips with melted cheese, jalapeños, sour cream, and guacamole',
        descriptionIt: 'Nachos croccanti con formaggio fuso, jalapeños, panna acida e guacamole',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop',
      },
      {
        name: 'Chicken Wings',
        nameIt: 'Alette di Pollo',
        description: 'Spicy buffalo wings served with blue cheese dip',
        descriptionIt: 'Alette piccanti buffalo con salsa al formaggio blu',
        price: 9.00,
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop',
      },
    ],
  },
  {
    id: '2',
    name: 'Burgers',
    nameIt: 'Hamburger',
    items: [
      {
        name: 'Classic Cheeseburger',
        nameIt: 'Cheeseburger Classico',
        description: '200g beef patty, cheddar, lettuce, tomato, pickles, special sauce',
        descriptionIt: 'Hamburger 200g, cheddar, lattuga, pomodoro, sottaceti, salsa speciale',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      },
      {
        name: 'Bacon BBQ Burger',
        nameIt: 'Burger Bacon BBQ',
        description: '200g beef patty, crispy bacon, BBQ sauce, onion rings, cheddar',
        descriptionIt: 'Hamburger 200g, bacon croccante, salsa BBQ, onion rings, cheddar',
        price: 14.00,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
      },
    ],
  },
  {
    id: '3',
    name: 'Beers',
    nameIt: 'Birre',
    items: [
      {
        name: 'Guinness Draught',
        nameIt: 'Guinness alla Spina',
        description: 'Iconic Irish stout with rich, creamy head',
        descriptionIt: 'Iconica stout irlandese con schiuma ricca e cremosa',
        price: 6.00,
        abv: 4.2,
        origin: 'Ireland',
      },
      {
        name: 'Peroni Nastro Azzurro',
        nameIt: 'Peroni Nastro Azzurro',
        description: 'Premium Italian lager, crisp and refreshing',
        descriptionIt: 'Lager italiana premium, fresca e dissetante',
        price: 5.00,
        abv: 5.1,
        origin: 'Italy',
      },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[400px] flex items-center justify-center">
          <Image
            src="https://www.pubsherlockholmes.com/public/theme/images/birre.png"
            alt="Sherlock Holmes Pub Menu"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-pub-green-dark/80" />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Our Menu
            </h1>
            <p className="text-xl">Traditional British pub fare and the finest beverages</p>
          </div>
        </section>

        {/* Digital Menu CTA */}
        <section className="py-8 bg-pub-brass">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <QrCode className="w-12 h-12 text-pub-wood-dark" />
              <div className="text-pub-wood-dark">
                <p className="text-lg font-bold">Ordering at the pub?</p>
                <p className="text-sm">Scan the QR code at your table for our full digital menu with ordering</p>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Preview */}
        <section className="py-16 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-heading">Menu Highlights</h2>
              <p className="section-subheading">A selection of our most popular items</p>
            </div>

            <div className="space-y-16">
              {menuCategories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-3xl font-serif font-bold text-pub-green mb-8 text-center">
                    {category.name} / {category.nameIt}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {category.items.map((item, index) => (
                      <div key={index} className="card hover:shadow-xl transition-shadow">
                        {item.image && (
                          <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-xl font-bold text-pub-green">{item.name}</h4>
                            <p className="text-sm text-neutral-500 italic">{item.nameIt}</p>
                          </div>
                          <span className="text-xl font-bold text-pub-brass">€{item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-neutral-600 mb-2">{item.description}</p>
                        <p className="text-sm text-neutral-500 italic">{item.descriptionIt}</p>
                        {item.abv && (
                          <div className="mt-3 flex gap-4 text-sm text-neutral-600">
                            <span className="font-medium">ABV: {item.abv}%</span>
                            <span className="font-medium">Origin: {item.origin}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-neutral-600 mb-6">
                This is just a small preview of our extensive menu. Visit us to see our full selection!
              </p>
              <Link href="/reservations" className="btn-primary">
                Book a Table
              </Link>
            </div>
          </div>
        </section>

        {/* Allergen Notice */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-serif font-bold text-pub-green mb-4">
              Allergen Information
            </h3>
            <p className="text-neutral-600">
              We take food allergies seriously. Please inform our staff of any allergies or dietary requirements,
              and we'll be happy to help you navigate our menu. Our digital menu at each table includes detailed
              allergen information for every dish.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-pub-green text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Experience Our Menu?
            </h2>
            <p className="text-xl mb-8 text-neutral-200">
              Book your table now or call us for reservations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservations" className="btn-secondary text-lg">
                Make a Reservation
              </Link>
              <a href="tel:+390522331518" className="btn-outline text-lg border-white text-white hover:bg-white hover:text-pub-green">
                Call to Order
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
