'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartProvider, useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { CreditCard, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutContent({ params }: { params: { tableId: string } }) {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'now' | 'later'>('now');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayNow = async () => {
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order first
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableId: params.tableId,
          items: cart.items,
          subtotal: cart.subtotal,
          tax: cart.tax,
          tip: cart.tip,
          total: cart.total,
          paymentStatus: 'UNPAID',
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId } = await orderResponse.json();

      // Create Stripe checkout session
      const checkoutResponse = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amount: cart.total,
          tableId: params.tableId,
        }),
      });

      if (!checkoutResponse.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await checkoutResponse.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again or pay at the counter.');
      setIsProcessing(false);
    }
  };

  const handlePayLater = async () => {
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableId: params.tableId,
          items: cart.items,
          subtotal: cart.subtotal,
          tax: cart.tax,
          tip: cart.tip,
          total: cart.total,
          paymentStatus: 'UNPAID',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId, orderNumber } = await response.json();

      clearCart();
      toast.success(`Order ${orderNumber} placed! Pay at the counter when ready.`);
      router.push(`/qr-menu/${params.tableId}/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push(`/qr-menu/${params.tableId}`)}
            className="btn-primary"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="bg-pub-green text-white p-4">
        <h1 className="text-2xl font-serif font-bold">Checkout</h1>
        <p className="text-sm text-pub-brass">Table {params.tableId}</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-serif font-bold text-pub-green mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Subtotal:</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Tax (22%):</span>
              <span>{formatPrice(cart.tax)}</span>
            </div>
            {cart.tip > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Tip:</span>
                <span>{formatPrice(cart.tip)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span className="text-pub-brass">{formatPrice(cart.total)}</span>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-serif font-bold text-pub-green mb-4">Payment Method</h2>

          <div className="space-y-4">
            <button
              onClick={() => setPaymentMethod('now')}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'now'
                  ? 'border-pub-green bg-pub-green/10'
                  : 'border-neutral-300 hover:border-pub-green'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-pub-green" />
                <div className="text-left flex-1">
                  <p className="font-bold text-pub-green">Pay Now</p>
                  <p className="text-sm text-neutral-600">
                    Credit/Debit Card, Apple Pay, Google Pay
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('later')}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'later'
                  ? 'border-pub-green bg-pub-green/10'
                  : 'border-neutral-300 hover:border-pub-green'
              }`}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-pub-green" />
                <div className="text-left flex-1">
                  <p className="font-bold text-pub-green">Pay at Counter</p>
                  <p className="text-sm text-neutral-600">
                    Order now, pay when you're ready to leave
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={paymentMethod === 'now' ? handlePayNow : handlePayLater}
          disabled={isProcessing}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing
            ? 'Processing...'
            : paymentMethod === 'now'
            ? `Pay ${formatPrice(cart.total)} Now`
            : 'Place Order'}
        </button>

        <p className="text-center text-sm text-neutral-600 mt-4">
          By placing your order, you agree to our terms of service
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage({ params }: { params: { tableId: string } }) {
  return (
    <CartProvider>
      <CheckoutContent params={params} />
    </CartProvider>
  );
}
