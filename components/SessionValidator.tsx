'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useRef } from 'react';

/**
 * SessionValidator component that validates sessions on mount
 * and clears invalid sessions (e.g., after server restart)
 */
export default function SessionValidator() {
  const { data: session, status } = useSession();
  const hasValidated = useRef(false);

  useEffect(() => {
    // Only validate once when component mounts
    if (hasValidated.current || status !== 'authenticated') {
      return;
    }

    hasValidated.current = true;

    // Validate the session with the server
    const validateSession = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('Session validation failed - logging out');
          await signOut({ redirect: false });
          window.location.href = '/';
          return;
        }

        const data = await response.json();
        
        // If session is empty or invalid, sign out
        if (!data || !data.user) {
          console.log('Invalid session data - logging out');
          await signOut({ redirect: false });
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Session validation error:', error);
        // On error, sign out to be safe
        await signOut({ redirect: false });
        window.location.href = '/';
      }
    };

    validateSession();
  }, [status, session]);

  return null; // This component doesn't render anything
}
