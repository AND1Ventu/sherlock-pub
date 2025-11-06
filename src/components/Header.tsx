'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { PUB_INFO } from '@/types';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Events', href: '/events' },
  { name: 'Location', href: '/location' },
  { name: 'Reservations', href: '/reservations' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-pub-green-dark shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-pub-green-dark border-b border-pub-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center text-sm text-neutral-200">
            <div className="flex items-center gap-4">
              <a href={`tel:${PUB_INFO.phone}`} className="flex items-center gap-2 hover:text-pub-brass transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">{PUB_INFO.phone}</span>
              </a>
              <a href={`mailto:${PUB_INFO.email}`} className="flex items-center gap-2 hover:text-pub-brass transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">{PUB_INFO.email}</span>
              </a>
            </div>
            <div className="text-pub-brass font-medium">
              Since 1995 • First English Pub in Italy
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://www.pubsherlockholmes.com/public/theme/images/logo.png"
                alt="Sherlock Holmes Pub"
                width={60}
                height={60}
                className="h-14 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-white">Sherlock Holmes</span>
                <span className="text-sm text-pub-brass uppercase tracking-wider">English Pub</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-pub-brass font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/reservations" className="btn-secondary">
              Book a Table
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-white hover:text-pub-brass"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-pub-green">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-pub-brass font-medium transition-colors duration-200 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/reservations"
                className="btn-secondary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Table
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
