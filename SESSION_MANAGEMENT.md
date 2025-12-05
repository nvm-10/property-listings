# Session Management & Security

This document explains the session management and security practices implemented in PropertyHub.

## Overview

PropertyHub implements industry-standard session management with multiple security layers to protect user accounts and data.

## Key Features

### 1. Session Expiration
- **Maximum session duration**: 7 days
- Sessions automatically expire after 7 days regardless of activity
- Users must sign in again after expiration

### 2. Idle Timeout
- **Inactivity timeout**: 1 hour
- If no user activity is detected for 1 hour, the session expires
- **Warning period**: 5 minutes before timeout
- Users receive a warning modal with countdown timer

### 3. Activity Tracking
The system tracks user activity through:
- Mouse movements
- Mouse clicks
- Keyboard input
- Scrolling
- Touch events (mobile)

Any of these activities reset the idle timer.

### 4. Session Security

#### HTTP-Only Cookies
- Session tokens are stored in HTTP-only cookies
- Prevents XSS (Cross-Site Scripting) attacks
- Cookies cannot be accessed via JavaScript

#### CSRF Protection
- `sameSite: 'lax'` cookie setting
- Protects against Cross-Site Request Forgery attacks

#### Secure Transmission
- In production: cookies are marked as `secure` (HTTPS only)
- In development: HTTP is allowed for localhost testing

### 5. Automatic Logout

Users are automatically logged out when:
1. **Maximum session age exceeded** (7 days)
2. **Idle timeout reached** (1 hour of inactivity)
3. **User clicks "Logout Now"** in warning modal
4. **Server restart** (sessions don't persist across restarts)

### 6. Session Refresh
- Sessions are updated every 24 hours
- JWT tokens include:
  - `iat`: Issued At timestamp
  - `lastActivity`: Last activity timestamp
  - `role`: User role (buyer/seller/admin)

## User Experience

### Idle Warning Modal

When a user has been inactive for 55 minutes:
1. Warning modal appears with countdown timer
2. Shows time remaining (5 minutes)
3. Two options:
   - **Stay Logged In**: Resets the idle timer
   - **Logout Now**: Immediately signs out

### After Logout

When a session expires or user logs out:
- Redirected to home page
- Session cleared from browser
- Must sign in again with Google OAuth

## Configuration

### Adjusting Timeouts

To modify session timeouts, edit `/lib/auth.ts`:

```typescript
// Maximum session duration (default: 7 days)
session: {
  maxAge: 7 * 24 * 60 * 60, // in seconds
}

// JWT expiration check (default: 7 days)
const maxAge = 7 * 24 * 60 * 60; // in seconds
```

To modify idle timeout, edit `/hooks/useIdleTimeout.ts`:

```typescript
// Idle timeout duration (default: 1 hour)
const IDLE_TIMEOUT = 60 * 60 * 1000; // in milliseconds

// Warning time before logout (default: 5 minutes)
const WARNING_TIME = 5 * 60 * 1000; // in milliseconds
```

## Best Practices Implemented

### ✅ Short-Lived Sessions
- 7-day maximum prevents indefinite sessions
- Forces periodic re-authentication

### ✅ Idle Detection
- Automatically logs out inactive users
- Reduces risk of unauthorized access from unattended devices

### ✅ Security Headers
- HTTP-only cookies prevent JavaScript access
- SameSite attribute prevents CSRF attacks
- Secure flag ensures HTTPS in production

### ✅ JWT with Claims
- Tokens include issued-at and last-activity timestamps
- Server-side validation on every request
- Cannot be tampered with (signed with secret)

### ✅ Graceful Warnings
- Users get 5-minute warning before auto-logout
- Can extend session without losing work
- Clear countdown timer shows time remaining

### ✅ No Persistent Sessions
- Sessions don't survive server restarts
- Reduces attack surface
- Forces re-authentication after deployments

## Server Restart Behavior

**Why sessions don't persist after restart:**
- JWT tokens are stateless but validated server-side
- Each server instance has a unique ID generated on startup
- After restart, old JWTs with previous instance ID are invalidated
- SessionValidator component checks and clears invalid sessions
- This is intentional for security reasons

**What happens:**
1. User is signed in before restart
2. Server restarts (new instance ID generated)
3. On next page load, SessionValidator detects old token
4. User is automatically signed out and cookies cleared
5. User must sign in again

This is **industry standard** and considered a security feature, not a bug.

## Cross-Device & Browser Behavior

**Each device/browser maintains separate sessions:**
- Opening the app on a new device requires fresh login
- Signing in on Device A doesn't affect Device B
- Each browser stores its own session cookie
- Private/incognito mode requires separate login

**Security implications:**
- Sessions are bound to specific server instances
- Old sessions are invalidated on server restart
- Can't share session cookies across devices (HTTP-only)
- Each device must authenticate independently

**Multi-device access:**
- User can be logged in on multiple devices simultaneously
- Each device has its own independent session
- Logging out on one device doesn't affect others
- All sessions expire based on their own timers

## Testing Session Management

### Test Maximum Session Age
1. Sign in with Google
2. Wait 7 days (or modify `maxAge` to shorter duration for testing)
3. Try to navigate - you'll be logged out

### Test Idle Timeout
1. Sign in with Google
2. Don't interact with the page for 1 hour (or modify timeout for testing)
3. At 55 minutes, warning modal appears
4. At 60 minutes, automatic logout occurs

### Test Activity Detection
1. Sign in with Google
2. Wait 55 minutes to see warning
3. Move mouse or click anywhere
4. Warning disappears and timer resets

## Security Recommendations

### For Production

1. **Use HTTPS** - Always use HTTPS in production
2. **Rotate Secrets** - Change `NEXTAUTH_SECRET` periodically
3. **Monitor Sessions** - Track unusual login patterns
4. **Rate Limiting** - Add rate limiting to prevent brute force
5. **Two-Factor Auth** - Consider adding 2FA for admin accounts

### For Users

1. **Always sign out** - Especially on shared devices
2. **Don't ignore warnings** - Take action on timeout warnings
3. **Use strong passwords** - For Google account security
4. **Enable 2FA on Google** - Protects your login method

## Troubleshooting

**Q: I'm logged out after server restart - is this a bug?**
A: No, this is intentional for security. Sessions don't persist across restarts.

**Q: Can I make sessions last longer?**
A: Yes, but not recommended for security. Modify `maxAge` in `/lib/auth.ts`.

**Q: The warning appears too quickly**
A: Adjust `IDLE_TIMEOUT` in `/hooks/useIdleTimeout.ts` to a longer duration.

**Q: I want to disable idle timeout**
A: Remove `<SessionMonitor />` from `/app/layout.tsx`, but this reduces security.

## Compliance

These practices align with:
- OWASP Session Management guidelines
- OAuth 2.0 best practices
- GDPR requirements for data protection
- SOC 2 compliance standards
