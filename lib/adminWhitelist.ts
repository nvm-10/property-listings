// Admin whitelist management
// Only emails in this whitelist can access admin features

const ADMIN_WHITELIST = process.env.ADMIN_WHITELIST?.split(',').map(email => email.trim().toLowerCase()) || [];

export function isAdminWhitelisted(email: string | null | undefined): boolean {
  if (!email) return false;
  
  // If no whitelist is configured, no one is admin
  if (ADMIN_WHITELIST.length === 0) return false;
  
  return ADMIN_WHITELIST.includes(email.toLowerCase());
}

export function getAdminWhitelist(): string[] {
  return ADMIN_WHITELIST;
}
