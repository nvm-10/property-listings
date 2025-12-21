# 🔐 Google OAuth Setup Guide

## Quick Start

Your app is already configured for Google OAuth! You just need to get your Google credentials.

## Step 1: Go to Google Cloud Console

Open your browser and go to: **https://console.cloud.google.com/**

## Step 2: Create a New Project

1. Click on the **project dropdown** at the top (or click "Select a project")
2. Click **"NEW PROJECT"**
3. Enter project details:
   - **Project name**: `PropertyHub` (or any name you prefer)
   - **Organization**: Leave as default (No organization)
4. Click **"CREATE"**
5. Wait for the project to be created (~5 seconds)
6. Make sure your new project is selected in the dropdown

## Step 3: Enable Google+ API (Required for OAuth)

1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"** in the search bar
3. Click on **"Google+ API"**
4. Click **"ENABLE"** button
5. Wait for it to enable (~2 seconds)

## Step 4: Configure OAuth Consent Screen

1. In the left sidebar, go to **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** user type (unless you have Google Workspace)
3. Click **"CREATE"**
4. Fill in required fields:
   - **App name**: `PropertyHub`
   - **User support email**: Your email address
   - **Developer contact email**: Your email address
5. Click **"SAVE AND CONTINUE"**
6. Skip "Scopes" page → Click **"SAVE AND CONTINUE"**
7. Skip "Test users" page → Click **"SAVE AND CONTINUE"**
8. Click **"BACK TO DASHBOARD"**

## Step 5: Create OAuth 2.0 Credentials

1. In the left sidebar, go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**
4. Choose application type: **"Web application"**
5. Configure the credentials:
   - **Name**: `PropertyHub Web Client` (or any name)
   - **Authorized JavaScript origins**:
     ```
     http://localhost:3000
     ```
   - **Authorized redirect URIs**:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
6. Click **"CREATE"**

## Step 6: Copy Your Credentials

After creating, you'll see a popup with:
- **Your Client ID**: Something like `123456789-abc123def456.apps.googleusercontent.com`
- **Your Client Secret**: Something like `GOCSPX-abc123def456ghi789`

**⚠️ IMPORTANT**: Copy both of these now! You'll need them in the next step.

## Step 7: Update Your .env.local File

Open the `.env.local` file in your project root and replace the placeholders:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=yZQxezhrZWRvVBOtbesxfCA/zvvMT8Hi6Mbk3veYJ2Q=

# Replace these with your actual credentials from Google Cloud Console
GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_ACTUAL_CLIENT_SECRET_HERE
```

Replace:
- `YOUR_ACTUAL_CLIENT_ID_HERE` with your Client ID
- `YOUR_ACTUAL_CLIENT_SECRET_HERE` with your Client Secret

**Save the file!**

## Step 8: Start the App

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

## Step 9: Test Authentication

1. Open **http://localhost:3000** in your browser
2. Click **"Sign In"** in the navbar
3. Choose either:
   - **"Find Properties"** (Buyer role)
   - **"List Properties"** (Seller role)
4. Click **"Continue with Google"**
5. Sign in with your Google account
6. Grant permissions when prompted
7. You'll be redirected to your dashboard!

## 🎉 You're Done!

Your authentication is now working with:
- ✅ Google OAuth sign-in
- ✅ Role-based access (Buyer/Seller)
- ✅ Protected dashboards
- ✅ User sessions

## 🔒 Security Notes

- **Never commit `.env.local`** to version control (it's already in `.gitignore`)
- Keep your Client Secret private
- For production deployment, update:
  - `NEXTAUTH_URL` to your production domain
  - Add production URLs to Google OAuth authorized origins/redirects

## 🐛 Troubleshooting

### "Invalid redirect URI" error
- Make sure the redirect URI in Google Console exactly matches:
  ```
  http://localhost:3000/api/auth/callback/google
  ```
- Check for typos and trailing slashes

### "Client ID not found" error
- Verify `.env.local` exists in the project root
- Check that variable names are correct (no typos)
- Restart the dev server after updating `.env.local`

### "This app isn't verified" warning
- This is normal in development
- Click "Advanced" → "Go to PropertyHub (unsafe)" to proceed
- In production, you'd verify your app with Google

### Session not persisting
- Clear browser cookies
- Check browser console for errors
- Make sure `NEXTAUTH_SECRET` is set

## 📱 How It Works

### User Flow
1. User clicks "Sign In"
2. Selects role (Buyer/Seller)
3. Redirected to Google OAuth
4. Grants permissions
5. Redirected back to app with role-specific dashboard

### Role System
- **Buyers**: Browse properties, contact agents, save favorites
- **Sellers**: Add properties, manage listings, view inquiries

### Session Management
- Sessions use JWT tokens
- Role stored in token
- Protected routes check authentication and role

## 🚀 Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. **Add production URLs to Google Console**:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Redirect URIs: `https://yourdomain.com/api/auth/callback/google`

2. **Update environment variables**:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=<same secret>
   GOOGLE_CLIENT_ID=<same client ID>
   GOOGLE_CLIENT_SECRET=<same secret>
   ```

3. **Set environment variables in your hosting platform**
   - Don't commit `.env.local` to git
   - Use your platform's environment variable settings

## 📞 Need Help?

Check the detailed setup guide: `AUTH_SETUP_GUIDE.md`

---

Built with ❤️ using Next.js 16, NextAuth.js, and TypeScript
