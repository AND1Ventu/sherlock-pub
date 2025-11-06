# Deployment Guide - Sherlock Holmes Pub Website

This guide will help you deploy the Sherlock Holmes Pub website to production.

## 📋 Pre-Deployment Checklist

- [ ] PostgreSQL database set up
- [ ] Stripe account configured
- [ ] Domain name ready (if using custom domain)
- [ ] All environment variables prepared
- [ ] Admin user credentials ready

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/sherlock-pub.git
git push -u origin main
```

### Step 2: Set Up Database

We recommend **Vercel Postgres** for easy integration:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new PostgreSQL database
3. Copy the connection string

Alternative options:
- **Supabase**: [supabase.com](https://supabase.com) - Free tier available
- **Railway**: [railway.app](https://railway.app) - Easy PostgreSQL setup
- **AWS RDS**: Production-grade but more complex

### Step 3: Deploy to Vercel

1. **Import Project**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select Next.js framework preset

2. **Configure Environment Variables**

   In Vercel project settings, add these variables:

   ```env
   # Database
   DATABASE_URL=your-postgres-connection-string

   # Auth
   NEXTAUTH_SECRET=generate-random-secret-32-chars
   NEXTAUTH_URL=https://your-domain.vercel.app

   # Stripe
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # App
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

   # Email (optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=info@pubsherlockholmes.com
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Step 4: Set Up Database Schema

After first deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

### Step 5: Configure Stripe Webhook

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy webhook signing secret
5. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

### Step 6: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., pubsherlockholmes.com)
3. Configure DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` to your custom domain

## 🔧 Alternative Deployment Options

### Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add PostgreSQL service
4. Configure environment variables
5. Deploy

### Deploy to DigitalOcean App Platform

1. Create new app from GitHub repo
2. Add database component
3. Configure environment variables
4. Deploy

### Self-Hosted (Docker)

```dockerfile
# Dockerfile included in project
docker build -t sherlock-pub .
docker run -p 3000:3000 --env-file .env sherlock-pub
```

## 📊 Post-Deployment

### 1. Create Admin User

```bash
npm run create-admin
```

### 2. Generate QR Codes

1. Log in to admin dashboard at `/admin`
2. Navigate to "Tables & QR"
3. Add all your tables
4. Download and print QR codes

### 3. Populate Menu

1. Navigate to "Menu" in admin dashboard
2. Add all menu categories
3. Add menu items with photos
4. Set allergen information
5. Mark featured items

### 4. Test Everything

- [ ] Public website loads correctly
- [ ] Scan QR code and test ordering
- [ ] Test payment flow (use Stripe test cards)
- [ ] Admin login works
- [ ] Order management functions
- [ ] Reservations work

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong NEXTAUTH_SECRET
- [ ] Use Stripe live keys (not test keys)
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up proper CORS if needed
- [ ] Review and update .gitignore
- [ ] Never commit .env files
- [ ] Enable Stripe webhook signature verification
- [ ] Set up monitoring and error tracking

## 📈 Performance Optimization

- [ ] Enable Vercel Analytics
- [ ] Configure image optimization
- [ ] Set up CDN for images
- [ ] Enable caching headers
- [ ] Optimize database queries
- [ ] Monitor Core Web Vitals

## 🐛 Troubleshooting

### Build Fails

**Error**: `Prisma Client not generated`
```bash
# Add postinstall script to package.json
"postinstall": "prisma generate"
```

### Database Connection Issues

**Error**: `Can't reach database server`
- Verify DATABASE_URL is correct
- Check database is running
- Verify IP whitelist (if applicable)

### Stripe Webhook Fails

**Error**: `No signatures found matching the expected signature`
- Verify STRIPE_WEBHOOK_SECRET is correct
- Check webhook endpoint URL
- Ensure webhook is configured for correct Stripe mode (test/live)

### Images Not Loading

- Check `next.config.mjs` remote patterns
- Verify image URLs are accessible
- Check CORS configuration

## 📞 Support

If you encounter issues:

1. Check logs in Vercel dashboard
2. Review GitHub issues
3. Contact support: info@pubsherlockholmes.com

## 🔄 Updates and Maintenance

### Deploy Updates

```bash
git add .
git commit -m "Update description"
git push origin main
```

Vercel will automatically deploy changes.

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name migration-name

# Deploy to production
npx prisma migrate deploy
```

### Backup Database

Set up automatic backups:
- Vercel Postgres: Automatic daily backups
- Supabase: Point-in-time recovery
- Railway: Automatic backups available

## 📝 Monitoring

Recommended monitoring tools:
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Stripe Dashboard**: Payment monitoring

---

## 🎉 You're Live!

Your Sherlock Holmes Pub website is now deployed and ready to serve customers!

Remember to:
1. Print QR codes and place them on tables
2. Train staff on admin dashboard
3. Test the complete ordering flow
4. Monitor orders and payments
5. Keep menu up to date

**Need help?** Contact info@pubsherlockholmes.com

---

Built with ❤️ for Italy's first authentic English pub since 1995.
