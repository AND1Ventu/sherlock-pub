'use client';

import { useEffect, useState } from 'react';
import AdminNav from '@/components/AdminNav';
import { TrendingUp, ShoppingBag, Users, Euro } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    totalReservations: 0,
  });

  useEffect(() => {
    // In production, fetch real stats from API
    setStats({
      todayOrders: 24,
      todayRevenue: 1247.50,
      pendingOrders: 3,
      totalReservations: 8,
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <AdminNav />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-pub-green mb-8">
            Dashboard Overview
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="w-10 h-10 text-pub-green" />
                <span className="text-2xl font-bold text-pub-green">{stats.todayOrders}</span>
              </div>
              <h3 className="text-sm font-medium text-neutral-600">Today's Orders</h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <Euro className="w-10 h-10 text-pub-brass" />
                <span className="text-2xl font-bold text-pub-brass">
                  {formatPrice(stats.todayRevenue)}
                </span>
              </div>
              <h3 className="text-sm font-medium text-neutral-600">Today's Revenue</h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-10 h-10 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</span>
              </div>
              <h3 className="text-sm font-medium text-neutral-600">Pending Orders</h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-10 h-10 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{stats.totalReservations}</span>
              </div>
              <h3 className="text-sm font-medium text-neutral-600">Today's Reservations</h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-serif font-bold text-pub-green mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/admin/orders" className="btn-primary text-center">
                View Pending Orders
              </a>
              <a href="/admin/menu" className="btn-secondary text-center">
                Manage Menu
              </a>
              <a href="/admin/tables" className="btn-outline text-center">
                Generate QR Codes
              </a>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-serif font-bold text-pub-green mb-4">Recent Orders</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-bold text-pub-green">Order #ORD-2024-001</p>
                  <p className="text-sm text-neutral-600">Table 5 • 2 items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-pub-brass">{formatPrice(34.50)}</p>
                  <p className="text-sm text-orange-600">Preparing</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-bold text-pub-green">Order #ORD-2024-002</p>
                  <p className="text-sm text-neutral-600">Table 12 • 5 items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-pub-brass">{formatPrice(87.00)}</p>
                  <p className="text-sm text-green-600">Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
