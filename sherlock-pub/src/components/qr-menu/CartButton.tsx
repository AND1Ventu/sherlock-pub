'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';

interface CartButtonProps {
  onClick: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const { cart } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-pub-green hover:bg-pub-green-light text-white rounded-full shadow-2xl p-4 flex items-center gap-3 transition-all duration-200 z-50"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-pub-brass text-pub-wood-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
      <span className="font-bold">{formatPrice(cart.total)}</span>
    </button>
  );
}
