'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, Cart } from '@/types';
import { calculateTax, calculateTotal } from '@/lib/utils';

interface CartContextType {
  cart: Cart;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setTip: (tip: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
  });

  const recalculateCart = useCallback((items: CartItem[], tip: number = 0) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, tip);

    setCart({
      items,
      subtotal,
      tax,
      tip,
      total,
    });
  }, []);

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.menuItemId === newItem.menuItemId &&
                JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
      );

      let updatedItems: CartItem[];
      if (existingItemIndex > -1) {
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        updatedItems = [...prevCart.items, { ...newItem, quantity: 1 }];
      }

      const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = calculateTax(subtotal);
      const total = calculateTotal(subtotal, prevCart.tip);

      return {
        items: updatedItems,
        subtotal,
        tax,
        tip: prevCart.tip,
        total,
      };
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.id !== id);
      const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = calculateTax(subtotal);
      const total = calculateTotal(subtotal, prevCart.tip);

      return {
        items: updatedItems,
        subtotal,
        tax,
        tip: prevCart.tip,
        total,
      };
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = calculateTax(subtotal);
      const total = calculateTotal(subtotal, prevCart.tip);

      return {
        items: updatedItems,
        subtotal,
        tax,
        tip: prevCart.tip,
        total,
      };
    });
  }, [removeItem]);

  const setTip = useCallback((tip: number) => {
    setCart(prevCart => {
      const total = calculateTotal(prevCart.subtotal, tip);
      return {
        ...prevCart,
        tip,
        total,
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      subtotal: 0,
      tax: 0,
      tip: 0,
      total: 0,
    });
  }, []);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, setTip }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
