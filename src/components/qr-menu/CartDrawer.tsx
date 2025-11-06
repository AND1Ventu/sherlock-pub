'use client';

import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tableId: string;
}

export default function CartDrawer({ isOpen, onClose, tableId }: CartDrawerProps) {
  const { cart, updateQuantity, removeItem, setTip } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    router.push(`/qr-menu/${tableId}/checkout`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="bg-pub-green text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold">Your Order</h2>
          <button onClick={onClose} className="hover:text-pub-brass transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-pub-green">{item.name}</h3>
                      <p className="text-sm text-neutral-600">{item.nameIt}</p>
                      {item.specialNotes && (
                        <p className="text-xs text-neutral-500 mt-1 italic">Note: {item.specialNotes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white border border-pub-green text-pub-green flex items-center justify-center hover:bg-pub-green hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-pub-green text-white flex items-center justify-center hover:bg-pub-green-light transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-pub-brass">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {cart.items.length > 0 && (
          <div className="border-t border-neutral-200 p-4 space-y-4">
            {/* Tip Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Add a tip?</label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTip(amount)}
                    className={`py-2 px-3 rounded-lg border-2 transition-colors ${
                      cart.tip === amount
                        ? 'border-pub-green bg-pub-green text-white'
                        : 'border-neutral-300 hover:border-pub-green'
                    }`}
                  >
                    €{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal:</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Tax (22%):</span>
                <span>{formatPrice(cart.tax)}</span>
              </div>
              {cart.tip > 0 && (
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tip:</span>
                  <span>{formatPrice(cart.tip)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-pub-brass">{formatPrice(cart.total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full btn-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
