import Link from 'next/link';
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PUB_INFO } from '@/types';

export default function Footer() {
  return (
    <footer className="bg-pub-wood-dark text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-pub-brass font-serif text-xl font-bold mb-4">Sherlock Holmes Pub</h3>
            <p className="text-sm leading-relaxed mb-4">
              Since 1995, the first authentic English pub in Italy. Built entirely by Torrys from Birmingham, UK. Experience true British pub culture in the heart of Reggio Emilia.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pub-brass transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pub-brass transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-pub-brass font-serif text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-pub-brass transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-pub-brass transition-colors">About Us</Link></li>
              <li><Link href="/menu" className="hover:text-pub-brass transition-colors">Menu</Link></li>
              <li><Link href="/events" className="hover:text-pub-brass transition-colors">Events</Link></li>
              <li><Link href="/reservations" className="hover:text-pub-brass transition-colors">Reservations</Link></li>
              <li><Link href="/admin" className="hover:text-pub-brass transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-pub-brass font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Opening Hours
            </h3>
            <ul className="space-y-2 text-sm">
              {Object.entries(PUB_INFO.hours).map(([day, hours]) => (
                <li key={day} className="flex justify-between">
                  <span className="font-medium">{day}:</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-pub-brass font-serif text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-pub-brass flex-shrink-0 mt-0.5" />
                <span>{PUB_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-pub-brass flex-shrink-0" />
                <a href={`tel:${PUB_INFO.phone}`} className="hover:text-pub-brass transition-colors">
                  {PUB_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-pub-brass flex-shrink-0" />
                <a href={`mailto:${PUB_INFO.email}`} className="hover:text-pub-brass transition-colors">
                  {PUB_INFO.email}
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/location" className="btn-outline text-sm py-2 px-4">
                Get Directions
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-pub-wood-light mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Sherlock Holmes Pub. All rights reserved. | Family-owned since 1995 by the Vuolo family.</p>
        </div>
      </div>
    </footer>
  );
}
