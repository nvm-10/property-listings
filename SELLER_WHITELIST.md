# 🔒 Seller Whitelist System

## Overview

The seller role is restricted to specific users via an email whitelist. This ensures only authorized users can list and manage properties on the platform.

## How It Works

1. **Whitelist Configuration**: Authorized seller emails are stored in `.env.local`
2. **Role Selection**: When users sign in, the seller option is only enabled for whitelisted emails
3. **Dashboard Protection**: Seller dashboard verifies access on every visit
4. **Visual Feedback**: Non-whitelisted users see a "Restricted" badge on the seller option

## Setup Instructions

### 1. Add Emails to Whitelist

Open `.env.local` and add comma-separated email addresses to `SELLER_WHITELIST`:

```env
SELLER_WHITELIST=alice@example.com,bob@company.com,seller@agency.com
```

**Important**: 
- Use commas to separate emails
- No spaces around commas (they'll be trimmed automatically)
- Case-insensitive matching

### 2. Example Configurations

**Single seller:**
```env
SELLER_WHITELIST=john.doe@realestate.com
```

**Multiple sellers:**
```env
SELLER_WHITELIST=agent1@agency.com,agent2@agency.com,owner@properties.com
```

**Allow all users (default behavior):**
```env
SELLER_WHITELIST=
```
*If empty, everyone can be a seller (backward compatibility)*

### 3. Restart the Server

After updating `.env.local`, restart the development server:

```bash
npm run dev
```

## User Experience

### For Whitelisted Users
1. Sign in with Google
2. See role selection page
3. **Both** Buyer and Seller options are available
4. Choose Seller → Access seller dashboard
5. Can add properties, upload images, manage listings

### For Non-Whitelisted Users  
1. Sign in with Google
2. See role selection page
3. Seller option shows **"Restricted"** badge
4. Seller card is grayed out and not clickable
5. Text reads: "Seller access is restricted. Contact support to request access."
6. Can only choose Buyer role

### Attempting Direct Access
If a non-whitelisted user tries to access `/dashboard/seller` directly:
- System checks their email against whitelist
- Automatically redirects to `/dashboard/buyer`
- Shows "Verifying access..." message during check

## Technical Details

### Files Involved

- **`lib/sellerWhitelist.ts`** - Whitelist validation logic
- **`app/api/check-seller-access/route.ts`** - API endpoint for checking access
- **`app/role-selection/page.tsx`** - Role selection UI with whitelist check
- **`app/dashboard/seller/page.tsx`** - Protected seller dashboard
- **`.env.local`** - Whitelist configuration

### API Endpoint

**POST** `/api/check-seller-access`

Request:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "allowed": true
}
```

### Security Features

✅ Server-side validation (not just client-side)  
✅ Protected dashboard routes  
✅ Email case-insensitive matching  
✅ Graceful fallback for configuration errors  
✅ Real-time access checks on role selection  

## Managing Access

### Adding a New Seller

1. Get their Google account email
2. Add to `SELLER_WHITELIST` in `.env.local`
3. Restart server
4. User can now select seller role on next login

### Removing Seller Access

1. Remove email from `SELLER_WHITELIST`
2. Restart server
3. User will be redirected to buyer dashboard on next visit

### Bulk Updates

Update all emails at once in `.env.local`:

```env
SELLER_WHITELIST=user1@email.com,user2@email.com,user3@email.com
```

## Production Deployment

For production environments (Vercel, Netlify, etc.):

1. **Set environment variable** in your hosting platform's dashboard:
   ```
   SELLER_WHITELIST=email1@domain.com,email2@domain.com
   ```

2. **Don't commit** `.env.local` to git (it's in `.gitignore`)

3. **Use platform-specific env vars**:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Railway: Project → Variables

## Testing

### Test Whitelist Behavior

1. **Add your email** to `SELLER_WHITELIST`
2. Sign in → Should see seller option enabled
3. **Remove your email** from whitelist
4. Sign out and sign in again → Seller option should be disabled
5. **Leave whitelist empty** → All users can be sellers

### Test Dashboard Protection

1. Remove your email from whitelist
2. Try visiting `/dashboard/seller` directly
3. Should redirect to `/dashboard/buyer`

## Troubleshooting

### "Seller option still restricted after adding email"
- Check email spelling (copy-paste recommended)
- Ensure no extra spaces in `.env.local`
- Restart the development server
- Clear browser cache and cookies
- Sign out and sign in again

### "All users can still access seller dashboard"
- Check if `SELLER_WHITELIST` is set (not just commented out)
- Verify the environment variable is loading (check console logs)
- Restart server after changing `.env.local`

### "Getting redirected even though I'm in whitelist"
- Verify email matches exactly (case-insensitive but spelling must match)
- Check for typos in email address
- Make sure you're signed in with the correct Google account

## Support Contact Flow

When non-whitelisted users request access:

1. User sees "Contact support to request access" message
2. They should email: **your-support-email@domain.com**
3. Include: Name, Google email, reason for seller access
4. Admin adds email to whitelist
5. User signs out and back in
6. Access granted!

## Future Enhancements

Potential improvements:
- Admin dashboard for managing whitelist
- Database-backed whitelist (vs environment variables)
- Role-based permissions (admin, seller, buyer)
- Temporary seller access with expiration
- Seller approval workflow
- Email verification for new sellers

## Quick Reference

```bash
# Add seller
SELLER_WHITELIST=existing@email.com,new@email.com

# Remove seller (just remove their email)
SELLER_WHITELIST=remaining@email.com

# Allow all (leave empty)
SELLER_WHITELIST=

# Restart server
npm run dev
```

---

**Note**: This is a simple whitelist system suitable for small-to-medium platforms. For enterprise use, consider implementing database-backed role management with an admin UI.
