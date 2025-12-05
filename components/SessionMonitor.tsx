'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useIdleTimeout } from '@/hooks/useIdleTimeout';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X } from 'lucide-react';

export default function SessionMonitor() {
  const { data: session, status } = useSession();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(5 * 60); // 5 minutes in seconds

  // Idle timeout hook
  useIdleTimeout(() => {
    if (status === 'authenticated') {
      setShowWarning(true);
    }
  });

  // Countdown timer for warning
  useEffect(() => {
    if (!showWarning) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showWarning]);

  const handleStayLoggedIn = () => {
    setShowWarning(false);
    setCountdown(5 * 60);
    // Reset the idle timer by triggering a session refresh
    window.dispatchEvent(new Event('mousedown'));
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Don't render if not authenticated
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <AnimatePresence>
      {showWarning && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
          />

          {/* Warning Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Session Expiring</h3>
                      <p className="text-sm text-white/90">Due to inactivity</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  You've been inactive for a while. For your security, we'll automatically log you out in:
                </p>

                {/* Countdown */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 mb-6 text-center">
                  <div className="text-5xl font-bold text-orange-600 mb-2">
                    {formatTime(countdown)}
                  </div>
                  <p className="text-sm text-gray-600">minutes remaining</p>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  Click "Stay Logged In" to continue your session, or "Logout" to sign out now.
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Logout Now
                  </button>
                  <button
                    onClick={handleStayLoggedIn}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
                  >
                    Stay Logged In
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
