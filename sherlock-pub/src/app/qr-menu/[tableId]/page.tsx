'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CartProvider, useCart } from '@/lib/cart-context';
import CartButton from '@/components/qr-menu/CartButton';
import CartDrawer from '@/components/qr-menu/CartDrawer';
import { formatPrice, cn } from '@/lib/utils';
import { ALLERGEN_LABELS } from '@/types';

// Sample menu data - in production, this would come from the database
const categories = [
  {
    id: '1',
    name: 'Appetizers',
    nameIt: 'Stuzzicherie',
    slug: 'appetizers',
    items: [
      {
        id: '1',
        menuItemId: '1',
        name: 'Nachos Supreme',
        nameIt: 'Nachos Supremi',
        description: 'Crispy tortilla chips with melted cheese, jalapeños, sour cream, and guacamole',
        descriptionIt: 'Nachos croccanti con formaggio fuso, jalapeños, panna acida e guacamole',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop',
        allergens: ['GLUTEN', 'DAIRY'],
        available: true,
      },
      {
        id: '2',
        menuItemId: '2',
        name: 'Chicken Wings',
        nameIt: 'Alette di Pollo',
        description: 'Spicy buffalo wings served with blue cheese dip',
        descriptionIt: 'Alette piccanti buffalo con salsa al formaggio blu',
        price: 9.00,
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop',
        allergens: ['DAIRY', 'CELERY'],
        available: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Burgers',
    nameIt: 'Hamburger',
    slug: 'burgers',
    items: [
      {
        id: '3',
        menuItemId: '3',
        name: 'Classic Cheeseburger',
        nameIt: 'Cheeseburger Classico',
        description: '200g beef patty, cheddar, lettuce, tomato, pickles, special sauce',
        descriptionIt: 'Hamburger 200g, cheddar, lattuga, pomodoro, sottaceti, salsa speciale',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
        allergens: ['GLUTEN', 'DAIRY', 'EGGS'],
        available: true,
      },
      {
        id: '4',
        menuItemId: '4',
        name: 'Bacon BBQ Burger',
        nameIt: 'Burger Bacon BBQ',
        description: '200g beef patty, crispy bacon, BBQ sauce, onion rings, cheddar',
        descriptionIt: 'Hamburger 200g, bacon croccante, salsa BBQ, onion rings, cheddar',
        price: 14.00,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
        allergens: ['GLUTEN', 'DAIRY', 'EGGS'],
        available: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Beers',
    nameIt: 'Birre',
    slug: 'beers',
    items: [
      {
        id: '5',
        menuItemId: '5',
        name: 'Guinness Draught',
        nameIt: 'Guinness alla Spina',
        description: 'Iconic Irish stout with rich, creamy head - 4.2% ABV',
        descriptionIt: 'Iconica stout irlandese con schiuma ricca e cremosa - 4.2% ABV',
        price: 6.00,
        allergens: ['GLUTEN'],
        available: true,
      },
      {
        id: '6',
        menuItemId: '6',
        name: 'Peroni Nastro Azzurro',
        nameIt: 'Peroni Nastro Azzurro',
        description: 'Premium Italian lager, crisp and refreshing - 5.1% ABV',
        descriptionIt: 'Lager italiana premium, fresca e dissetante - 5.1% ABV',
        price: 5.00,
        allergens: ['GLUTEN'],
        available: true,
      },
    ],
  },
];

function QRMenuContent({ params }: { params: { tableId: string } }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].slug);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'it'>('en');
  const { addItem } = useCart();

  const currentCategory = categories.find(cat => cat.slug === selectedCategory);

  const handleAddToCart = (item: any) => {
    addItem({
      id: crypto.randomUUID(),
      menuItemId: item.menuItemId,
      name: item.name,
      nameIt: item.nameIt,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-pub-green text-white shadow-lg">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-2xl font-serif font-bold">Sherlock Holmes Pub</h1>
              <p className="text-sm text-pub-brass">Table {params.tableId}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  'px-3 py-1 rounded-lg transition-colors',
                  language === 'en' ? 'bg-pub-brass text-pub-wood-dark' : 'bg-pub-green-dark'
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('it')}
                className={cn(
                  'px-3 py-1 rounded-lg transition-colors',
                  language === 'it' ? 'bg-pub-brass text-pub-wood-dark' : 'bg-pub-green-dark'
                )}
              >
                IT
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={cn(
                  'px-4 py-2 rounded-lg whitespace-nowrap transition-colors',
                  selectedCategory === category.slug
                    ? 'bg-white text-pub-green font-bold'
                    : 'bg-pub-green-dark hover:bg-pub-green-light'
                )}
              >
                {language === 'en' ? category.name : category.nameIt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6 pb-24">
        <h2 className="text-2xl font-serif font-bold text-pub-green mb-6">
          {language === 'en' ? currentCategory?.name : currentCategory?.nameIt}
        </h2>

        <div className="space-y-4">
          {currentCategory?.items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex">
                {item.image && (
                  <div className="w-32 h-32 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-pub-green">
                        {language === 'en' ? item.name : item.nameIt}
                      </h3>
                      <p className="text-sm text-neutral-600 mt-1">
                        {language === 'en' ? item.description : item.descriptionIt}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-pub-brass ml-2">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {item.allergens && item.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.allergens.map(allergen => (
                        <span
                          key={allergen}
                          className="text-xs bg-neutral-100 px-2 py-1 rounded"
                          title={ALLERGEN_LABELS[allergen]?.[language] || allergen}
                        >
                          {ALLERGEN_LABELS[allergen]?.icon} {ALLERGEN_LABELS[allergen]?.[language]}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.available ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      Add to Order
                    </button>
                  ) : (
                    <span className="text-red-600 text-sm font-medium">Currently Unavailable</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Button */}
      <CartButton onClick={() => setIsCartOpen(true)} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        tableId={params.tableId}
      />
    </div>
  );
}

export default function QRMenuPage({ params }: { params: { tableId: string } }) {
  return (
    <CartProvider>
      <QRMenuContent params={params} />
    </CartProvider>
  );
}
