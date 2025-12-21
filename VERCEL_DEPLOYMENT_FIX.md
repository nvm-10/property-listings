# 🔧 Fix OAuth Redirect URI Mismatch - Vercel Deployment

## The Problem
You're seeing: **Error 400: redirect_uri_mismatch** because Google OAuth doesn't have your Vercel deployment URL registered.

## ✅ Solution (5 Minutes)

### Step 1: Get Your Vercel Deployment URL

1. Go to https://vercel.com/dashboard
2. Find your project: **property-listings**
3. Copy your deployment URL (it will be something like):
   - `https://property-listings-xxx.vercel.app` OR
   - `https://your-custom-domain.com`

### Step 2: Add Vercel URL to Google Cloud Console

1. Go to: https://console.cloud.google.com/
2. Select your project (PropertyHub or the project you created for this app)
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID and click **Edit** (pencil icon)

5. **Add these URLs:**

   **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   https://your-vercel-url.vercel.app
   ```
   
   **Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-vercel-url.vercel.app/api/auth/callback/google
   ```

   **⚠️ Replace `your-vercel-url.vercel.app` with your actual Vercel URL!**

6. Click **SAVE**

### Step 3: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

   | Name | Value |
   |------|-------|
   | `NEXTAUTH_URL` | `https://your-vercel-url.vercel.app` |
   | `NEXTAUTH_SECRET` | Copy from your `.env.local` file |
   | `GOOGLE_CLIENT_ID` | Copy from your `.env.local` file |
   | `GOOGLE_CLIENT_SECRET` | Copy from your `.env.local` file |
   | `SELLER_WHITELIST` | (leave empty or add emails) |
   | `ADMIN_WHITELIST` | Copy from your `.env.local` file |

   **⚠️ For each variable, select "All Environments" (Production, Preview, Development)**

4. Click **Save** for each variable

### Step 4: Redeploy

1. In Vercel dashboard, go to **Deployments**
2. Click **"..."** (three dots) on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (~1-2 minutes)

### Step 5: Test Authentication

1. Visit your Vercel URL: `https://your-vercel-url.vercel.app`
2. Click **"Sign In"** button
3. Select a role (Buyer/Seller)
4. Click **"Continue with Google"**
5. Sign in with your Google account
6. ✅ You should be redirected to your dashboard!

## 🔍 Testing Checklist

After deployment, verify these work:

- [ ] Home page loads with dark theme
- [ ] Sign In button opens auth modal
- [ ] Google OAuth sign-in works without redirect error
- [ ] After sign-in, redirected to role selection
- [ ] Can access dashboard after selecting role
- [ ] Properties page displays listings
- [ ] Clicking property opens detail page
- [ ] Contact modal works
- [ ] Footer appears on all pages
- [ ] Navbar navigation works
- [ ] All links are functional

## 🐛 Still Having Issues?

### "redirect_uri_mismatch" persists
- Double-check the redirect URI has **NO trailing slash**
- Verify the URL matches EXACTLY (http vs https, www vs non-www)
- Clear browser cache and try incognito mode
- Wait 5 minutes for Google changes to propagate

### "Invalid Client ID" error
- Verify environment variables are set in Vercel
- Check for typos in variable names
- Redeploy after setting environment variables

### Can't access certain pages
- Check that you're signed in
- Verify your email is in ADMIN_WHITELIST or SELLER_WHITELIST (if needed)
- Check browser console for errors

### Navbar or Footer not showing
- Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Clear Vercel cache: Redeploy with "Clear Cache" option

## 📝 Quick Reference

**Required Redirect URI Format:**
```
https://[your-domain]/api/auth/callback/google
```

## 🎯 Expected Behavior After Fix

1. **Landing Page** → Dark theme with gradient hero section
2. **Sign In** → Modal with role selection
3. **Google Auth** → Smooth redirect (no errors)
4. **Dashboard** → Role-specific content
5. **Properties** → Grid of property cards
6. **Property Detail** → Full page with images and info
7. **Footer** → Visible on all pages with gradient background

## 🚀 Production Tips

1. **Custom Domain**: If you add a custom domain to Vercel, add it to Google OAuth too
2. **Security**: Never commit `.env.local` to GitHub (already in .gitignore)
3. **Testing**: Always test in incognito after deployment
4. **Monitoring**: Check Vercel logs if authentication fails

## ✅ All Done!

Once you complete these steps:
1. ✅ OAuth will work on production
2. ✅ All pages will be accessible
3. ✅ Authentication will be seamless
4. ✅ Dark theme will be consistent
5. ✅ Footer will appear everywhere

---

**Need the exact Vercel URL?** Check your email from Vercel or visit https://vercel.com/dashboard
