'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';
import { Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { formatPrice, formatTime } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  orderNumber: string;
  tableId?: string;
  table?: { number: string };
  status: string;
  paymentStatus: string;
  total: number;
  items: any[];
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const params = filter !== 'all' ? `?status=${filter}` : '';
      const response = await fetch(`/api/orders${params}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success('Order status updated!');
        fetchOrders();
      } else {
        toast.error('Failed to update order');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'PREPARING':
        return 'bg-orange-100 text-orange-800';
      case 'READY':
        return 'bg-green-100 text-green-800';
      case 'DELIVERED':
        return 'bg-purple-100 text-purple-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <AdminNav />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-pub-green">
              Orders Management
            </h1>
            <button
              onClick={fetchOrders}
              className="btn-outline flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex gap-2 overflow-x-auto">
              {['all', 'PENDING', 'PREPARING', 'READY', 'COMPLETED'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    filter === status
                      ? 'bg-pub-green text-white'
                      : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                >
                  {status === 'all' ? 'All Orders' : status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {isLoading ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-neutral-600">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-xl text-neutral-600 mb-2">No orders found</p>
              <p className="text-sm text-neutral-500">Orders will appear here when customers place them</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-pub-green mb-1">
                        {order.orderNumber}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        {order.table && (
                          <span>Table {order.table.number}</span>
                        )}
                        <span>
                          <Clock className="w-4 h-4 inline mr-1" />
                          {formatTime(new Date(order.createdAt))}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-pub-brass mb-2">
                        {formatPrice(order.total)}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4 border-t pt-4">
                    <h4 className="font-medium text-neutral-700 mb-2">Order Items:</h4>
                    <ul className="space-y-2">
                      {order.items.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.menuItem?.name || 'Item'}</span>
                          <span className="text-neutral-600">{formatPrice(item.total)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status Actions */}
                  {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
                    <div className="flex gap-2 border-t pt-4">
                      {order.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
                            className="flex-1 btn-primary py-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 inline mr-1" />
                            Confirm
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                            className="btn-outline py-2 px-4 text-sm text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                          >
                            <XCircle className="w-4 h-4 inline mr-1" />
                            Cancel
                          </button>
                        </>
                      )}
                      {order.status === 'CONFIRMED' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                          className="flex-1 btn-primary py-2 text-sm"
                        >
                          Start Preparing
                        </button>
                      )}
                      {order.status === 'PREPARING' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'READY')}
                          className="flex-1 btn-primary py-2 text-sm"
                        >
                          Mark as Ready
                        </button>
                      )}
                      {order.status === 'READY' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                          className="flex-1 btn-primary py-2 text-sm"
                        >
                          Mark as Delivered
                        </button>
                      )}
                      {order.status === 'DELIVERED' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                          className="flex-1 btn-primary py-2 text-sm"
                        >
                          Complete Order
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
