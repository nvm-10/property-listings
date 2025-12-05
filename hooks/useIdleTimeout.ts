import { useEffect, useCallback, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';

const IDLE_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds
const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before timeout

export function useIdleTimeout(onWarning?: () => void) {
  const { status } = useSession();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const warningTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const resetTimer = useCallback(() => {
    // Clear existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    // Only set timer if user is authenticated
    if (status === 'authenticated') {
      // Set warning timer
      if (onWarning) {
        warningTimeoutRef.current = setTimeout(() => {
          onWarning();
        }, IDLE_TIMEOUT - WARNING_TIME);
      }

      // Set logout timer
      timeoutRef.current = setTimeout(() => {
        signOut({ callbackUrl: '/?timeout=true' });
      }, IDLE_TIMEOUT);
    }
  }, [status, onWarning]);

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }

    // Events that reset the idle timer
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, [status, resetTimer]);

  return { resetTimer };
}
