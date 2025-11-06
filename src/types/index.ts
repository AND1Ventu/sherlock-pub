export interface PubInfo {
  name: string;
  location: string;
  phone: string;
  email: string;
  founded: number;
  hours: {
    [key: string]: string;
  };
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  nameIt: string;
  price: number;
  quantity: number;
  image?: string;
  customizations?: Record<string, any>;
  specialNotes?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
}

export const ALLERGEN_LABELS: Record<string, { en: string; it: string; icon: string }> = {
  GLUTEN: { en: 'Gluten', it: 'Glutine', icon: '🌾' },
  DAIRY: { en: 'Dairy', it: 'Latticini', icon: '🥛' },
  EGGS: { en: 'Eggs', it: 'Uova', icon: '🥚' },
  FISH: { en: 'Fish', it: 'Pesce', icon: '🐟' },
  SHELLFISH: { en: 'Shellfish', it: 'Crostacei', icon: '🦐' },
  NUTS: { en: 'Nuts', it: 'Frutta a guscio', icon: '🥜' },
  PEANUTS: { en: 'Peanuts', it: 'Arachidi', icon: '🥜' },
  SOY: { en: 'Soy', it: 'Soia', icon: '🫘' },
  CELERY: { en: 'Celery', it: 'Sedano', icon: '🥬' },
  MUSTARD: { en: 'Mustard', it: 'Senape', icon: '🌭' },
  SESAME: { en: 'Sesame', it: 'Sesamo', icon: '🫘' },
  SULFITES: { en: 'Sulfites', it: 'Solfiti', icon: '🍷' },
  LUPIN: { en: 'Lupin', it: 'Lupini', icon: '🫘' },
  MOLLUSCS: { en: 'Molluscs', it: 'Molluschi', icon: '🦪' },
};

export const PUB_INFO: PubInfo = {
  name: 'Sherlock Holmes Pub',
  location: 'Via Louis Pasteur 13, 42122 Reggio Emilia, Italy',
  phone: '+39 0522 331518',
  email: 'info@pubsherlockholmes.com',
  founded: 1995,
  hours: {
    Sunday: '19:00 - 01:00',
    Monday: 'Closed',
    Tuesday: '19:00 - 00:00',
    Wednesday: '19:00 - 01:00',
    Thursday: '19:00 - 01:00',
    Friday: '19:00 - 03:00',
    Saturday: '19:00 - 03:00',
  },
};
