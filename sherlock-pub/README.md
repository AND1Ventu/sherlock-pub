# Sherlock Holmes Pub - Full Stack Website

A modern, full-stack website redesign for Sherlock Holmes Pub in Reggio Emilia, Italy's first authentic English pub, featuring a public website, QR code-accessible digital menu with ordering system, and comprehensive admin dashboard.

## 🎯 Features

### Public Website
- ✅ Modern, responsive design with English pub aesthetic
- ✅ Homepage with hero section and featured content
- ✅ About page with pub history and timeline
- ✅ Menu preview page
- ✅ Events and entertainment page
- ✅ Location page with Google Maps integration
- ✅ Online reservation system
- ✅ Mobile-first, fully responsive design

### QR Code Digital Menu System
- ✅ Table-specific QR codes for contactless ordering
- ✅ Multi-language support (Italian/English)
- ✅ Browse menu by categories
- ✅ Add items to cart with customization options
- ✅ Real-time cart updates
- ✅ Order submission with special instructions
- ✅ Integrated Stripe payment (pay now or at counter)
- ✅ Allergen information display
- ✅ Mobile-optimized interface

### Admin Dashboard
- ✅ Secure authentication system
- ✅ Real-time order management
- ✅ Order status tracking (Pending → Preparing → Ready → Delivered → Completed)
- ✅ Menu management (coming soon)
- ✅ QR code generation and management
- ✅ Table management
- ✅ Reservation management
- ✅ Dashboard analytics
- ✅ Kitchen display mode

### Payment Integration
- ✅ Stripe Checkout integration
- ✅ Italian payment methods support
- ✅ Card payments (Visa, Mastercard, Amex)
- ✅ Apple Pay / Google Pay
- ✅ PayPal support
- ✅ Pay now or pay later options
- ✅ Tip addition feature
- ✅ Receipt generation

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT-based auth
- **Payment**: Stripe
- **QR Codes**: qrcode library
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd sherlock-pub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sherlock_pub"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (for order confirmations)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="info@pubsherlockholmes.com"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
```

### 5. Create Admin User

Run this script to create the first admin user:

```bash
npm run create-admin
```

Or manually in Prisma Studio:

```bash
npx prisma studio
```

Create a user with:
- Email: admin@pubsherlockholmes.com
- Password: (hash using bcrypt)
- Role: ADMIN

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Application Structure

```
sherlock-pub/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── images/                # Static images
├── src/
│   ├── app/
│   │   ├── (public pages)
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── menu/
│   │   │   ├── events/
│   │   │   ├── location/
│   │   │   └── reservations/
│   │   ├── qr-menu/
│   │   │   └── [tableId]/     # QR menu system
│   │   ├── admin/
│   │   │   ├── dashboard/     # Admin dashboard
│   │   │   ├── orders/        # Order management
│   │   │   ├── menu/          # Menu management
│   │   │   └── tables/        # QR code generation
│   │   └── api/
│   │       ├── auth/          # Authentication
│   │       ├── orders/        # Order management
│   │       ├── tables/        # Table management
│   │       └── reservations/  # Reservation system
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminNav.tsx
│   │   └── qr-menu/
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   ├── utils.ts           # Utility functions
│   │   └── cart-context.tsx   # Cart state management
│   └── types/
│       └── index.ts           # TypeScript types
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#1B4332` (Deep English Pub Green)
- **Burgundy**: `#6D1F1F` (Accent color)
- **Brass**: `#B8860B` (Gold accents)
- **Wood**: `#3E2723` (Dark wood tones)

### Typography
- **Headings**: Merriweather (Serif)
- **Body**: Inter (Sans-serif)

## 🔐 Admin Access

Default admin credentials (for demo):
- **Email**: admin@pubsherlockholmes.com
- **Password**: sherlock2025

**Important**: Change these credentials in production!

## 📊 Database Schema

Key models:
- **User**: Admin users with role-based access
- **Category**: Menu categories
- **MenuItem**: Menu items with prices, allergens, etc.
- **Table**: Restaurant tables with QR codes
- **Order**: Customer orders with items and payment info
- **OrderItem**: Individual items in orders
- **Reservation**: Table reservations
- **Event**: Pub events

## 💳 Payment Setup

### Stripe Configuration

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add keys to `.env` file
4. Enable Italian payment methods in Stripe Dashboard
5. Set up webhook endpoint: `/api/webhooks/stripe`

### Supported Payment Methods
- Credit/Debit Cards
- Apple Pay
- Google Pay
- PayPal
- Italian payment methods (Bancomat, PostePay)

## 🔄 QR Code System

### How It Works

1. Admin creates tables in the admin dashboard
2. System generates unique QR codes for each table
3. QR codes can be downloaded or printed
4. Customers scan QR code at their table
5. Digital menu opens with table ID
6. Customers browse, order, and pay
7. Orders appear in admin dashboard for kitchen

### Generating QR Codes

1. Log in to admin dashboard
2. Navigate to "Tables & QR"
3. Click "Add New Table"
4. Enter table number and capacity
5. QR code is automatically generated
6. Download or print the QR code

## 📦 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Using Vercel CLI
npm i -g vercel
vercel
```

### Database Hosting

Recommended PostgreSQL hosts:
- **Vercel Postgres** (integrated with Vercel)
- **Supabase** (free tier available)
- **Railway** (easy setup)
- **AWS RDS** (production-ready)

### Environment Variables on Vercel

Add all variables from `.env` file to Vercel project settings:
- Project Settings → Environment Variables
- Add each variable individually
- Include for Production, Preview, and Development environments

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 📝 Usage Guide

### For Customers

1. **Scan QR Code**: Use phone camera to scan QR code at table
2. **Browse Menu**: Select language and browse categories
3. **Add to Cart**: Tap items to add to order
4. **Customize**: Add special requests or customizations
5. **Checkout**: Choose to pay now or at counter
6. **Track Order**: See real-time order status

### For Staff (Admin)

1. **View Orders**: See all incoming orders in real-time
2. **Update Status**: Move orders through workflow (Pending → Preparing → Ready → Delivered → Completed)
3. **Manage Menu**: Add/edit menu items, set availability
4. **Generate QR Codes**: Create QR codes for new tables
5. **View Analytics**: Track sales and popular items

## 🛡️ Security Features

- Secure authentication with JWT
- Password hashing with bcrypt
- API route protection
- SQL injection prevention (Prisma)
- XSS protection
- CSRF protection
- Secure payment processing (Stripe)
- Environment variable protection

## 📈 Future Enhancements

- [ ] Real-time order updates with WebSockets
- [ ] Kitchen display system (KDS) with notifications
- [ ] Inventory management
- [ ] Customer loyalty program
- [ ] Email marketing integration
- [ ] Advanced analytics and reporting
- [ ] Multi-location support
- [ ] Staff scheduling
- [ ] Customer reviews and ratings

## 🤝 Support

For questions or issues:
- Email: info@pubsherlockholmes.com
- Phone: +39 0522 331518
- Address: Via Louis Pasteur 13, 42122 Reggio Emilia, Italy

## 📄 License

Copyright © 2025 Sherlock Holmes Pub. All rights reserved.

---

Built with ❤️ for Italy's first authentic English pub since 1995.
