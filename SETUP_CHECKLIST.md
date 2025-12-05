# ✅ Google OAuth Setup Checklist

## Current Status

✅ **App configured** - NextAuth.js is installed and configured  
✅ **NEXTAUTH_SECRET generated** - Secure random secret created  
✅ **NEXTAUTH_URL set** - Configured for localhost  
⏳ **Google OAuth pending** - Need to create credentials  

## What You Need to Do

### 1️⃣ Get Google Credentials (5 minutes)

Follow the guide: **`GOOGLE_AUTH_SETUP.md`**

Quick link: https://console.cloud.google.com/

You'll get:
- `GOOGLE_CLIENT_ID` (looks like: `123456-abc.apps.googleusercontent.com`)
- `GOOGLE_CLIENT_SECRET` (looks like: `GOCSPX-abc123`)

### 2️⃣ Update .env.local

Open `.env.local` and replace:
```env
GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_ACTUAL_CLIENT_SECRET_HERE
```

With your actual credentials from Google Cloud Console.

### 3️⃣ Start the App

```bash
npm run dev
```

### 4️⃣ Test It

1. Go to http://localhost:3000
2. Click "Sign In"
3. Choose role (Buyer or Seller)
4. Sign in with Google
5. 🎉 Done!

## Features Ready to Use

Once Google OAuth is set up:

### For Buyers/Investors
- Browse available properties
- Schedule property visits
- Save favorite listings
- Contact sellers
- View investment details (ROI, cash flow)

### For Sellers/Agents
- Add new property listings
- Upload property images
- Set pricing and financial details
- Manage contact information
- Track listing status

### Property Management
- Automatic status updates (Available → Pending → Sold)
- Visit scheduling marks properties as Pending
- Only Available properties shown to buyers
- localStorage persistence (data survives page refresh)

## File Structure

```
property-listings/
├── .env.local                    ← UPDATE THIS with Google credentials
├── GOOGLE_AUTH_SETUP.md          ← Follow this guide
├── SETUP_CHECKLIST.md            ← You are here
├── AUTH_SETUP_GUIDE.md           ← Detailed authentication info
│
├── lib/auth.ts                   ← NextAuth configuration
├── app/api/auth/[...nextauth]/   ← Auth API routes
├── components/
│   ├── AuthModal.tsx             ← Sign-in modal with role selection
│   ├── ContactModal.tsx          ← Contact form for properties
│   ├── Navbar.tsx                ← Navigation with auth UI
│   └── SessionProvider.tsx       ← Session wrapper
│
├── contexts/
│   └── PropertyContext.tsx       ← Property state management
│
└── app/
    ├── page.tsx                  ← Home page
    ├── properties/page.tsx       ← Property listings
    └── dashboard/
        ├── buyer/page.tsx        ← Buyer dashboard
        └── seller/page.tsx       ← Seller dashboard
```

## Need Help?

### Google Console Not Working?
- Make sure you're signed in to Google
- Try incognito/private window if you have multiple Google accounts
- Check that JavaScript origins and redirect URIs are exact matches

### App Won't Start?
- Make sure `.env.local` exists in the project root
- Check for typos in variable names
- Restart terminal after updating `.env.local`
- Run `npm install` if dependencies are missing

### Authentication Not Working?
- Clear browser cookies
- Check browser console for errors
- Verify Google OAuth consent screen is configured
- Make sure redirect URI matches exactly in Google Console

## What Happens When You Sign In?

```
User Flow:
┌─────────────┐
│ Click       │
│ "Sign In"   │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Choose Role │  ← Buyer or Seller
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Google    │  ← OAuth consent
│  Sign In    │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Dashboard  │  ← Role-specific
└─────────────┘
```

## Quick Test Commands

```bash
# Generate a new secret (if needed)
openssl rand -base64 32

# Start development server
npm run dev

# Check environment variables are loaded
# (Open browser console and check for auth errors)

# Clear localStorage (if testing property management)
# In browser console: localStorage.clear()
```

## Pro Tips

1. **Test both roles**: Sign in as both Buyer and Seller to see different dashboards
2. **Try property workflow**: Add a listing as Seller → Schedule visit as Buyer → See it disappear from listings
3. **Check persistence**: Add a property → Refresh page → Property is still there (localStorage)
4. **Mobile test**: Auth modal and all features work on mobile

## Ready to Go Live?

When deploying to production:
1. Update Google OAuth with production URLs
2. Set environment variables in hosting platform
3. Update `NEXTAUTH_URL` to production domain
4. Keep same `NEXTAUTH_SECRET` (or generate a new production one)

---

**Next Step**: Open `GOOGLE_AUTH_SETUP.md` and follow the steps to get your Google credentials! 🚀
