# 🔐 Authentication Setup Guide

## Overview

This application now includes Google OAuth authentication with two user roles:
- **Buyers/Investors** - Browse and save properties
- **Sellers/Agents** - List and manage properties

## 🚀 Quick Setup

### Step 1: Install Dependencies (Already Done)
The following packages have been installed:
```bash
npm install next-auth @auth/core
```

### Step 2: Set Up Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select a Project**
   - Click on the project dropdown at the top
   - Create a new project or select an existing one

3. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Configure:
     - **Name**: PropertyHub (or your preferred name)
     - **Authorized JavaScript origins**: 
       ```
       http://localhost:3000
       ```
     - **Authorized redirect URIs**:
       ```
       http://localhost:3000/api/auth/callback/google
       ```
   - Click "Create"

5. **Copy Credentials**
   - Copy the **Client ID** and **Client Secret**

### Step 3: Configure Environment Variables

1. **Create `.env.local` file** in the project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Add your credentials** to `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<generate-random-secret>
   GOOGLE_CLIENT_ID=<your-client-id>
   GOOGLE_CLIENT_SECRET=<your-client-secret>
   ```

3. **Generate NEXTAUTH_SECRET**:
   Run this command in your terminal:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as the `NEXTAUTH_SECRET` value

### Step 4: Test the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Test Sign In**:
   - Click "Sign In" button in the navbar
   - Select either "Find Properties" (Buyer) or "List Properties" (Seller)
   - Sign in with your Google account
   - You'll be redirected to your dashboard

## 📱 User Flows

### Buyer Flow (House Hunters)
1. Click "Sign In" → Select "Find Properties"
2. Authenticate with Google
3. Redirected to Buyer Dashboard (`/dashboard/buyer`)
4. Browse properties
5. Save favorites
6. View saved properties in dashboard

### Seller Flow (Property Listers)
1. Click "Sign In" → Select "List Properties"
2. Authenticate with Google
3. Redirected to Seller Dashboard (`/dashboard/seller`)
4. Fill out property listing form with:
   - Property images (upload multiple)
   - Basic information (title, type)
   - Financial details (price, ROI, cash flow)
   - Location (address, city, state, ZIP)
   - Features (beds, baths, sqft, year built)
   - Description
   - Contact information
5. Click "Publish Property"

## 🎨 Features Implemented

### Authentication
- ✅ Google OAuth sign-in
- ✅ Role selection (Buyer/Seller)
- ✅ Beautiful auth modal with smooth animations
- ✅ User menu in navbar with avatar
- ✅ Protected routes by role
- ✅ Session management
- ✅ Sign out functionality

### Seller Dashboard
- ✅ Multi-image upload with preview
- ✅ Comprehensive property form
- ✅ Image removal functionality
- ✅ Form validation
- ✅ Contact information fields
- ✅ Gradient styling consistent with site
- ✅ Responsive design

### UI Components
- ✅ AuthModal with two-step flow
- ✅ User menu dropdown
- ✅ Loading states
- ✅ Role-based redirects
- ✅ Protected route wrappers

## 📁 New Files Created

### Authentication
- `lib/auth.ts` - NextAuth configuration
- `types/user.ts` - User and role types
- `types/next-auth.d.ts` - NextAuth type extensions
- `app/api/auth/[...nextauth]/route.ts` - API route handler

### Components
- `components/AuthModal.tsx` - Authentication modal
- `components/SessionProvider.tsx` - Session provider wrapper

### Pages
- `app/dashboard/seller/page.tsx` - Seller dashboard with property form
- `app/dashboard/buyer/page.tsx` - Buyer dashboard (to be implemented)

### Configuration
- `.env.local.example` - Environment variables template
- `AUTH_SETUP_GUIDE.md` - This setup guide

## 🔒 Security Notes

### Important
- **Never commit `.env.local` to version control**
- The `.env.local` file is already in `.gitignore`
- Keep your Google OAuth credentials secure
- Use strong, random secrets for `NEXTAUTH_SECRET`

### Production Deployment
When deploying to production:
1. Update `NEXTAUTH_URL` to your production domain
2. Add production URL to Google OAuth authorized origins
3. Add production callback URL to Google OAuth redirect URIs
4. Use environment variables in your hosting platform

## 🎯 Next Steps (Optional Enhancements)

1. **Buyer Dashboard** - Currently a placeholder
   - Add saved properties functionality
   - Property comparison tool
   - Investment calculator

2. **Database Integration**
   - Connect to a database (MongoDB, PostgreSQL, etc.)
   - Store user data and properties
   - Implement real image upload to cloud storage

3. **Email Notifications**
   - Send welcome emails
   - Notify when new properties match criteria
   - Property inquiry notifications

4. **Admin Dashboard**
   - Manage all listings
   - User management
   - Analytics

## 🐛 Troubleshooting

### "Invalid redirect URI" error
- Make sure your redirect URI in Google Console exactly matches:
  `http://localhost:3000/api/auth/callback/google`

### "Client ID not found" error
- Verify `.env.local` file exists
- Check that environment variables are correctly named
- Restart the development server after adding .env.local

### Session not persisting
- Clear browser cookies
- Verify `NEXTAUTH_SECRET` is set
- Check browser console for errors

### Images not displaying in Google avatar
- This is expected if using default avatar
- The fallback gradient icon will be shown

## 💡 Tips

- Use Chrome DevTools to inspect Network tab for auth issues
- Check browser console for detailed error messages
- NextAuth provides detailed error pages during development
- User role can be changed by updating the JWT token

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure Google OAuth credentials are properly configured
4. Restart the development server

---

Built with ❤️ using Next.js 16, NextAuth.js, and TypeScript
