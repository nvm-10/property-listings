# Admin Access Configuration

This document explains how to configure admin access for PropertyHub.

## Overview

Admins have full control over the platform including:
- Adding new property listings
- Deleting any property listing
- Changing status of any property (Available/Pending/Sold)
- Viewing all system statistics
- Managing all properties in one dashboard

## Setting Up Admin Access

Admin access is controlled via an environment variable whitelist. Only users whose email addresses are in this whitelist can select the "Admin" role during login.

### Configuration Steps

1. Open your `.env.local` file in the project root

2. Add or update the `ADMIN_WHITELIST` variable:

```env
ADMIN_WHITELIST=admin@example.com,another.admin@company.com
```

**Format:**
- Comma-separated list of email addresses
- No spaces between emails (unless part of the email)
- Case-insensitive matching
- If left empty, no users will have admin access

### Example Configuration

```env
# Single admin
ADMIN_WHITELIST=john@example.com

# Multiple admins
ADMIN_WHITELIST=john@example.com,jane@company.com,admin@domain.com
```

## How It Works

1. User signs in with Google OAuth
2. System checks both `SELLER_WHITELIST` and `ADMIN_WHITELIST`
3. On the role selection page:
   - All users see "Buyer/Investor" option
   - Whitelisted sellers see "Seller/Agent" option
   - Whitelisted admins see "Admin" option (most privileged)
4. User selects their role and is redirected to the appropriate dashboard

## Admin Dashboard Features

Once logged in as admin, you can access:

- **Dashboard**: `/dashboard/admin`
  - View statistics (total, available, pending, sold properties)
  - Quick action buttons
  - Complete listing management table

- **Listing Management**:
  - View all properties in a table format
  - Change property status via dropdown (Available/Pending/Sold)
  - Delete properties with confirmation modal
  - View individual property details

- **Add New Properties**:
  - Access seller dashboard to add listings
  - All admin users can add properties

## Security Notes

- Admin access is checked on both client and server side
- Direct URL access to admin routes is protected
- Non-admin users attempting to access admin routes are redirected to home page
- The whitelist is checked during role selection and cannot be bypassed

## Granting Admin Access

To grant someone admin privileges:

1. Add their Google account email to `ADMIN_WHITELIST` in `.env.local`
2. Restart the development server (or redeploy in production)
3. Have them sign out and sign in again
4. They will now see the "Admin" option on the role selection page

## Revoking Admin Access

To revoke admin privileges:

1. Remove their email from `ADMIN_WHITELIST` in `.env.local`
2. Restart the development server (or redeploy in production)
3. Their existing session will still have admin role until they sign out
4. Upon next sign-in, they will only see Buyer/Seller options

## Troubleshooting

**"I added my email but don't see the Admin option"**
- Ensure the email matches exactly what Google returns (check in browser console)
- Restart the development server after changing `.env.local`
- Sign out and sign in again
- Check for typos or extra spaces in the whitelist

**"Can I be both a seller and admin?"**
- Yes! If your email is in both whitelists, you can choose either role
- Admin role includes all seller capabilities

**"Where do I find the admin dashboard?"**
- After selecting Admin role: `/dashboard/admin`
- Or click your profile picture → Dashboard

## Production Deployment

When deploying to production:

1. Set `ADMIN_WHITELIST` as an environment variable in your hosting platform
2. Use production email addresses (not test accounts)
3. Keep the list minimal for security
4. Regularly audit who has admin access
5. Consider using a service account for automated admin tasks
