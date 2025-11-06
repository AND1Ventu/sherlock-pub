import { PrismaClient, Allergen } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('sherlock2025', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@pubsherlockholmes.com' },
    update: {},
    create: {
      email: 'admin@pubsherlockholmes.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create categories
  const categories = [
    { name: 'Appetizers', nameIt: 'Stuzzicherie', slug: 'appetizers', order: 1 },
    { name: 'Burgers', nameIt: 'Hamburger', slug: 'burgers', order: 2 },
    { name: 'Sandwiches', nameIt: 'Panini', slug: 'sandwiches', order: 3 },
    { name: 'Salads', nameIt: 'Insalate', slug: 'salads', order: 4 },
    { name: 'Sides', nameIt: 'Contorni', slug: 'sides', order: 5 },
    { name: 'Desserts', nameIt: 'Dolci', slug: 'desserts', order: 6 },
    { name: 'Beers', nameIt: 'Birre', slug: 'beers', order: 7 },
    { name: 'Wines', nameIt: 'Vini', slug: 'wines', order: 8 },
    { name: 'Cocktails', nameIt: 'Cocktails', slug: 'cocktails', order: 9 },
    { name: 'Soft Drinks', nameIt: 'Analcolici', slug: 'soft-drinks', order: 10 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('✅ Categories created');

  // Create sample menu items
  const appetizersCategory = await prisma.category.findUnique({ where: { slug: 'appetizers' } });
  const burgersCategory = await prisma.category.findUnique({ where: { slug: 'burgers' } });
  const beersCategory = await prisma.category.findUnique({ where: { slug: 'beers' } });

  if (appetizersCategory) {
    await prisma.menuItem.createMany({
      data: [
        {
          name: 'Nachos Supreme',
          nameIt: 'Nachos Supremi',
          description: 'Crispy tortilla chips with melted cheese, jalapeños, sour cream, and guacamole',
          descriptionIt: 'Nachos croccanti con formaggio fuso, jalapeños, panna acida e guacamole',
          price: 8.50,
          categoryId: appetizersCategory.id,
          allergens: [Allergen.GLUTEN, Allergen.DAIRY],
          available: true,
        },
        {
          name: 'Chicken Wings',
          nameIt: 'Alette di Pollo',
          description: 'Spicy buffalo wings served with blue cheese dip (8 pieces)',
          descriptionIt: 'Alette piccanti buffalo con salsa al formaggio blu (8 pezzi)',
          price: 9.00,
          categoryId: appetizersCategory.id,
          allergens: [Allergen.DAIRY, Allergen.CELERY],
          available: true,
        },
        {
          name: 'Mozzarella Sticks',
          nameIt: 'Bastoncini di Mozzarella',
          description: 'Deep-fried mozzarella sticks with marinara sauce (6 pieces)',
          descriptionIt: 'Bastoncini di mozzarella fritti con salsa marinara (6 pezzi)',
          price: 7.00,
          categoryId: appetizersCategory.id,
          allergens: [Allergen.GLUTEN, Allergen.DAIRY, Allergen.EGGS],
          available: true,
        },
      ],
      skipDuplicates: true,
    });
  }

  if (burgersCategory) {
    await prisma.menuItem.createMany({
      data: [
        {
          name: 'Classic Cheeseburger',
          nameIt: 'Cheeseburger Classico',
          description: '200g beef patty, cheddar cheese, lettuce, tomato, pickles, special sauce',
          descriptionIt: 'Hamburger 200g, cheddar, lattuga, pomodoro, sottaceti, salsa speciale',
          price: 12.00,
          categoryId: burgersCategory.id,
          allergens: [Allergen.GLUTEN, Allergen.DAIRY, Allergen.EGGS],
          available: true,
          featured: true,
        },
        {
          name: 'Bacon BBQ Burger',
          nameIt: 'Burger Bacon BBQ',
          description: '200g beef patty, crispy bacon, BBQ sauce, onion rings, cheddar cheese',
          descriptionIt: 'Hamburger 200g, bacon croccante, salsa BBQ, onion rings, cheddar',
          price: 14.00,
          categoryId: burgersCategory.id,
          allergens: [Allergen.GLUTEN, Allergen.DAIRY, Allergen.EGGS],
          available: true,
          featured: true,
        },
        {
          name: 'Veggie Burger',
          nameIt: 'Burger Vegetariano',
          description: 'Plant-based patty, lettuce, tomato, avocado, vegan mayo',
          descriptionIt: 'Hamburger vegetale, lattuga, pomodoro, avocado, maionese vegana',
          price: 11.00,
          categoryId: burgersCategory.id,
          allergens: [Allergen.GLUTEN, Allergen.SOY],
          available: true,
        },
      ],
      skipDuplicates: true,
    });
  }

  if (beersCategory) {
    await prisma.menuItem.createMany({
      data: [
        {
          name: 'Guinness Draught',
          nameIt: 'Guinness alla Spina',
          description: 'Iconic Irish stout with rich, creamy head',
          descriptionIt: 'Iconica stout irlandese con schiuma ricca e cremosa',
          price: 6.00,
          categoryId: beersCategory.id,
          allergens: [Allergen.GLUTEN],
          available: true,
          featured: true,
          abv: 4.2,
          origin: 'Ireland',
          style: 'Stout',
        },
        {
          name: 'Peroni Nastro Azzurro',
          nameIt: 'Peroni Nastro Azzurro',
          description: 'Premium Italian lager, crisp and refreshing',
          descriptionIt: 'Lager italiana premium, fresca e dissetante',
          price: 5.00,
          categoryId: beersCategory.id,
          allergens: [Allergen.GLUTEN],
          available: true,
          abv: 5.1,
          origin: 'Italy',
          style: 'Lager',
        },
        {
          name: 'London Pride',
          nameIt: 'London Pride',
          description: 'Classic British ale with balanced malt and hop flavors',
          descriptionIt: 'Ale britannica classica con sapori bilanciati di malto e luppolo',
          price: 5.50,
          categoryId: beersCategory.id,
          allergens: [Allergen.GLUTEN],
          available: true,
          abv: 4.7,
          origin: 'England',
          style: 'Ale',
        },
      ],
      skipDuplicates: true,
    });
  }

  console.log('✅ Menu items created');

  // Create sample tables
  const tableNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  for (const number of tableNumbers) {
    await prisma.table.upsert({
      where: { number },
      update: {},
      create: {
        number,
        qrCode: '', // QR codes will be generated via admin panel
        capacity: number <= '6' ? 4 : 6,
        active: true,
      },
    });
  }

  console.log('✅ Tables created');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
