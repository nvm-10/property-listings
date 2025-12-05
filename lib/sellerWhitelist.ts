/**
 * Check if an email is whitelisted to be a seller
 */
export function isSellerWhitelisted(email: string | null | undefined): boolean {
  if (!email) return false;

  const whitelist = process.env.SELLER_WHITELIST || '';
  
  // If whitelist is empty, allow all users (backward compatibility)
  if (!whitelist.trim()) {
    return true;
  }

  // Parse comma-separated emails and trim whitespace
  const allowedEmails = whitelist
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(e => e.length > 0);

  // Check if user's email is in the whitelist
  return allowedEmails.includes(email.toLowerCase());
}

/**
 * Get the list of whitelisted seller emails
 */
export function getSellerWhitelist(): string[] {
  const whitelist = process.env.SELLER_WHITELIST || '';
  
  if (!whitelist.trim()) {
    return [];
  }

  return whitelist
    .split(',')
    .map(e => e.trim())
    .filter(e => e.length > 0);
}
