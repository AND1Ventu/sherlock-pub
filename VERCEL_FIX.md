# Vercel 404 Error - Fix Guide

You're getting a 404 error because the build is likely failing or missing environment variables. Here's how to fix it:

## 🔧 Quick Fix Steps

### Step 1: Add Required Environment Variables in Vercel

1. Go to your Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `sherlock-pub` project
3. Go to **Settings** → **Environment Variables**
4. Add these **REQUIRED** variables:

```env
# DATABASE - REQUIRED for build
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Auth - REQUIRED
NEXTAUTH_SECRET=your-secret-here-use-openssl-rand-base64-32
NEXTAUTH_URL=https://your-app.vercel.app

# App URL - REQUIRED
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Important Notes:**
- DATABASE_URL must be valid even for build (Prisma needs it)
- Use the same DATABASE_URL for all environments initially
- NEXTAUTH_URL should match your Vercel app URL
- Click "Add" after each variable

### Step 2: Get a FREE PostgreSQL Database

**Option A: Vercel Postgres (Recommended)**
1. In Vercel Dashboard, go to **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Choose Hobby (free tier)
5. The DATABASE_URL will be automatically added to your environment variables

**Option B: Supabase (Alternative)**
1. Go to [supabase.com](https://supabase.com)
2. Create free account
3. Create new project
4. Go to **Settings** → **Database**
5. Copy **Connection String** (URI format)
6. Add as DATABASE_URL in Vercel

### Step 3: Add Optional Environment Variables

These can be added later but are needed for full functionality:

```env
# Stripe - For payments (use test keys for now)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email - For notifications (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=info@pubsherlockholmes.com
```

### Step 4: Redeploy

After adding environment variables:

1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click the **⋯** menu
4. Click **Redeploy**

OR just push a new commit:

```bash
git add .
git commit -m "Add vercel config"
git push origin main
```

## 🔍 How to Check Build Logs

1. Go to Vercel Dashboard
2. Click on your latest deployment
3. Click **"View Function Logs"** or **"Build Logs"**
4. Look for errors (usually red text)

Common errors to look for:
- `DATABASE_URL is not defined`
- `Prisma Client could not be generated`
- `TypeScript compilation failed`

## ✅ Verify Deployment

After redeploying, check:

1. **Build should succeed** (green checkmark)
2. **Visit your URL**: https://your-app.vercel.app
3. **Should see**: Sherlock Holmes Pub homepage
4. **Test**: Navigate to /about, /menu, etc.

## 🐛 Still Getting 404?

### Check 1: Verify Environment Variables

In Vercel → Settings → Environment Variables, ensure you have:
- ✅ DATABASE_URL
- ✅ NEXTAUTH_SECRET
- ✅ NEXTAUTH_URL
- ✅ NEXT_PUBLIC_APP_URL

### Check 2: Check Build Output

In the build logs, look for:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (7/7)
```

If you see errors here, that's the problem!

### Check 3: Common Build Errors

**Error: "Cannot find module '@prisma/client'"**
- Solution: DATABASE_URL is missing or invalid

**Error: "Build failed"**
- Solution: Check the full build logs for TypeScript errors

**Error: "NEXTAUTH_SECRET is not defined"**
- Solution: Add NEXTAUTH_SECRET in environment variables

## 📝 Quick Test DATABASE_URL

To test if your DATABASE_URL works:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab
4. If you created Vercel Postgres, it should show connected

## 🎯 Complete Environment Variable Checklist

Copy this to Vercel Environment Variables:

```env
# REQUIRED FOR BUILD (Add these first!)
DATABASE_URL=your-postgres-connection-string
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app

# OPTIONAL (Add later for full functionality)
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=info@pubsherlockholmes.com
```

## 🚀 After Successful Deployment

Once your site is live:

1. **Set up database schema**:
   ```bash
   # Connect to Vercel
   vercel env pull

   # Run migrations
   npx prisma migrate deploy

   # Seed database
   npm run db:seed
   ```

2. **Test the site**:
   - Visit homepage
   - Try /admin login
   - Test QR menu: /qr-menu/test-table

3. **Create admin user** in Prisma Studio or via API

## 🆘 Still Having Issues?

If you're still seeing 404 after all this:

1. Share the build logs (copy/paste)
2. Verify DATABASE_URL format is correct:
   ```
   postgresql://user:password@host:5432/database
   ```
3. Make sure you clicked "Add" after each environment variable
4. Try deleting and recreating the Vercel project

---

**Need more help?** Check the build logs and look for the first error message - that's usually the culprit!
