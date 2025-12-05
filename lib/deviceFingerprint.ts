import { headers } from 'next/headers';
import crypto from 'crypto';

/**
 * Generate a device fingerprint based on request headers
 * This helps prevent session sharing across different devices/browsers
 */
export async function getDeviceFingerprint(): Promise<string> {
  const headersList = await headers();
  
  const userAgent = headersList.get('user-agent') || '';
  const acceptLanguage = headersList.get('accept-language') || '';
  const acceptEncoding = headersList.get('accept-encoding') || '';
  
  // Combine relevant headers to create a fingerprint
  const fingerprintData = `${userAgent}|${acceptLanguage}|${acceptEncoding}`;
  
  // Hash the fingerprint for privacy and consistency
  return crypto
    .createHash('sha256')
    .update(fingerprintData)
    .digest('hex')
    .substring(0, 32); // Use first 32 chars
}

/**
 * Validate if the current request matches the device fingerprint
 */
export async function validateDeviceFingerprint(storedFingerprint: string): Promise<boolean> {
  const currentFingerprint = await getDeviceFingerprint();
  return currentFingerprint === storedFingerprint;
}
