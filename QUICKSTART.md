# Quick Start Guide - Sherlock Holmes Pub Website

Get your website up and running in 10 minutes!

## 🚀 Fast Setup

### 1. Install Dependencies

```bash
cd sherlock-pub
npm install
```

### 2. Set Up Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Minimum required for local development
DATABASE_URL="postgresql://user:password@localhost:5432/sherlock_pub"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Add Stripe keys when ready to test payments
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 3. Set Up Database

```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 What You Get

### Public Website
- ✅ **Homepage**: [http://localhost:3000](http://localhost:3000)
- ✅ **About**: [http://localhost:3000/about](http://localhost:3000/about)
- ✅ **Menu**: [http://localhost:3000/menu](http://localhost:3000/menu)
- ✅ **Events**: [http://localhost:3000/events](http://localhost:3000/events)
- ✅ **Location**: [http://localhost:3000/location](http://localhost:3000/location)
- ✅ **Reservations**: [http://localhost:3000/reservations](http://localhost:3000/reservations)

### QR Menu System
- ✅ **Test Menu**: [http://localhost:3000/qr-menu/test-table](http://localhost:3000/qr-menu/test-table)
  - Browse menu
  - Add items to cart
  - Test checkout flow

### Admin Dashboard
- ✅ **Admin Login**: [http://localhost:3000/admin](http://localhost:3000/admin)
  - **Email**: admin@pubsherlockholmes.com
  - **Password**: sherlock2025

- ✅ **Dashboard**: Manage orders, menu, tables, QR codes

## 📱 Test the Complete Flow

### 1. Customer Journey

1. Go to [http://localhost:3000/qr-menu/test-table](http://localhost:3000/qr-menu/test-table)
2. Browse menu and add items
3. Go to checkout
4. Choose "Pay at Counter"
5. Submit order

### 2. Admin View

1. Log in at [http://localhost:3000/admin](http://localhost:3000/admin)
2. Go to "Orders"
3. See your test order
4. Update status: Confirm → Preparing → Ready → Delivered → Completed

### 3. Generate QR Codes

1. In admin dashboard, go to "Tables & QR"
2. Click "Add New Table"
3. Enter table number (e.g., "1")
4. Download or print QR code
5. Scan with your phone to test

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:seed          # Seed with sample data
npm run db:studio        # Open Prisma Studio (database GUI)

# Admin
npm run create-admin     # Create new admin user
```

## 🎨 Customization

### Update Pub Information

Edit [`src/types/index.ts`](src/types/index.ts):

```typescript
export const PUB_INFO: PubInfo = {
  name: 'Your Pub Name',
  location: 'Your Address',
  phone: '+39 ...',
  email: 'your@email.com',
  // ...
};
```

### Add Menu Items

Option 1: Use Admin Dashboard
1. Log in to admin at `/admin`
2. Go to "Menu" (coming soon in admin)
3. Add categories and items

Option 2: Edit Seed File
1. Edit [`prisma/seed.ts`](prisma/seed.ts)
2. Add your menu items
3. Run `npm run db:seed`

### Customize Colors

Edit [`tailwind.config.ts`](tailwind.config.ts):

```typescript
colors: {
  pub: {
    green: {
      DEFAULT: "#1B4332",  // Your primary color
      // ...
    },
  },
},
```

## 🔐 Security Notes

**Before going live:**

1. ✅ Change admin password
2. ✅ Use strong NEXTAUTH_SECRET
3. ✅ Use Stripe live keys (not test)
4. ✅ Never commit .env file
5. ✅ Review security checklist in DEPLOYMENT.md

## 📝 Sample Data Included

The seed script includes:

- ✅ Admin user (admin@pubsherlockholmes.com)
- ✅ 10 menu categories
- ✅ 15+ sample menu items
- ✅ 10 sample tables
- ✅ Allergen information
- ✅ Sample beers, burgers, appetizers

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Database Connection Error

```bash
# Check PostgreSQL is running
# Update DATABASE_URL in .env
# Try:
npm run db:push
```

### Prisma Client Not Generated

```bash
npx prisma generate
```

### Can't Log In to Admin

```bash
# Reset admin password
npm run create-admin
```

## 📚 Next Steps

1. **Customize Content**: Update pub info, images, menu
2. **Set Up Payments**: Add Stripe keys and test payments
3. **Generate QR Codes**: Create QR codes for all tables
4. **Test Everything**: Go through complete customer journey
5. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) guide

## 🆘 Need Help?

- 📖 **Full README**: [README.md](README.md)
- 🚀 **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- 💼 **Support**: info@pubsherlockholmes.com

## 🎉 You're Ready!

Your Sherlock Holmes Pub website is set up and running locally!

**Test URLs:**
- Public Site: http://localhost:3000
- QR Menu: http://localhost:3000/qr-menu/test-table
- Admin: http://localhost:3000/admin

---

**Happy coding! 🍺**

Built with ❤️ for Italy's first authentic English pub since 1995.
