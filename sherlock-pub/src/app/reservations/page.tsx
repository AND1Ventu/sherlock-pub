'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, Users, Phone, Mail, User } from 'lucide-react';
import { PUB_INFO } from '@/types';
import toast from 'react-hot-toast';

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Reservation request sent! We\'ll confirm shortly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          specialRequests: '',
        });
      } else {
        toast.error('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-pub-green text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-6 text-pub-brass" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Book Your Table
            </h1>
            <p className="text-xl">Reserve your spot at Italy's first English pub</p>
          </div>
        </section>

        {/* Reservation Form */}
        <section className="py-16 bg-neutral-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pub-green focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pub-green focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pub-green focus:border-transparent"
                      placeholder="+39 123 456 7890"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-neutral-700 mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Number of Guests *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      required
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pub-green focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="10+">10+ Guests (Large Party)</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pub-green focus:border-transparent"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-neutral-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Preferred Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pub-green focus:border-transparent"
                    >
                      <option value="">Select a time</option>
                      <option value="19:00">19:00 (7:00 PM)</option>
                      <option value="19:30">19:30 (7:30 PM)</option>
                      <option value="20:00">20:00 (8:00 PM)</option>
                      <option value="20:30">20:30 (8:30 PM)</option>
                      <option value="21:00">21:00 (9:00 PM)</option>
                      <option value="21:30">21:30 (9:30 PM)</option>
                      <option value="22:00">22:00 (10:00 PM)</option>
                      <option value="22:30">22:30 (10:30 PM)</option>
                      <option value="23:00">23:00 (11:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-neutral-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={4}
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pub-green focus:border-transparent"
                    placeholder="Any allergies, dietary restrictions, or special occasions we should know about?"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary text-lg px-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Reservation'}
                  </button>
                  <p className="text-sm text-neutral-600 mt-4">
                    We'll confirm your reservation via email or phone within 24 hours
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

              <div className="card text-center">
                <Phone className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Call Us Directly</h3>
                <p className="text-neutral-600 mb-4">
                  Prefer to book by phone? Give us a call!
                </p>
                <a
                  href={`tel:${PUB_INFO.phone}`}
                  className="text-lg font-bold text-pub-brass hover:text-pub-brass-light"
                >
                  {PUB_INFO.phone}
                </a>
              </div>

              <div className="card text-center">
                <Users className="w-12 h-12 text-pub-brass mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-pub-green mb-2">Large Groups</h3>
                <p className="text-neutral-600 mb-4">
                  Planning a party or event for 10+ people?
                </p>
                <a
                  href="mailto:info@pubsherlockholmes.com?subject=Large Group Reservation"
                  className="text-pub-brass hover:text-pub-brass-light font-medium"
                >
                  Email us for special arrangements
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Walk-ins Welcome */}
        <section className="py-12 bg-pub-green text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-serif font-bold mb-2">Walk-ins Welcome!</h3>
            <p className="text-lg text-neutral-200">
              While reservations are recommended, especially on weekends and for major sporting events,
              we always try to accommodate walk-in guests. Come by and we'll do our best to find you a spot!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
