'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, QrCode, Calendar, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Menu', href: '/admin/menu', icon: UtensilsCrossed },
  { name: 'Tables & QR', href: '/admin/tables', icon: QrCode },
  { name: 'Reservations', href: '/admin/reservations', icon: Calendar },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  return (
    <nav className="bg-pub-green-dark h-screen w-64 fixed left-0 top-0 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-pub-brass">Sherlock Holmes</h1>
        <p className="text-sm text-neutral-300">Admin Dashboard</p>
      </div>

      <div className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-pub-brass text-pub-wood-dark font-bold'
                  : 'hover:bg-pub-green-light'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-pub-burgundy transition-colors mt-auto"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </nav>
  );
}
