'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useIdleTimeout } from '@/hooks/useIdleTimeout';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, LogOut, Shield, Sparkles } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function SessionMonitor() {
  const { data: session, status } = useSession();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(5 * 60);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useIdleTimeout(() => {
    if (status === 'authenticated') {
      setShowWarning(true);
    }
  });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  if (status !== 'authenticated') {
    return null;
  }

  const modalContent = (
    <AnimatePresence>
      {showWarning && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="bg-[#1a1f2e] rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-700 my-auto"
            >
              {/* Animated Header */}
              <div className="relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/20 rounded-full"
                      style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                <div className="relative p-6 text-white">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center"
                  >
                    {/* Animated Icon */}
                    <motion.div
                      variants={itemVariants}
                      className="relative mb-3"
                    >
                      <motion.div
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(255,255,255,0.2)',
                            '0 0 40px rgba(255,255,255,0.3)',
                            '0 0 20px rgba(255,255,255,0.2)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Clock className="w-8 h-8" />
                      </motion.div>
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                      </motion.div>
                    </motion.div>

                    <motion.h2
                      variants={itemVariants}
                      className="text-2xl font-bold text-center mb-1"
                    >
                      Session Expiring
                    </motion.h2>
                    <motion.p
                      variants={itemVariants}
                      className="text-center text-orange-100/90 text-sm"
                    >
                      Due to inactivity
                    </motion.p>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-6"
              >
                <motion.p variants={itemVariants} className="text-gray-300 mb-6 text-center">
                  For your security, we'll automatically log you out in:
                </motion.p>

                {/* Countdown */}
                <motion.div 
                  variants={itemVariants}
                  className="relative rounded-2xl p-6 mb-6 text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-2xl" />
                  <motion.div 
                    className="relative text-5xl font-bold text-orange-400 mb-2"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {formatTime(countdown)}
                  </motion.div>
                  <p className="relative text-sm text-gray-400">minutes remaining</p>
                </motion.div>

                {/* Security note */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center space-x-2 mb-6 text-gray-400 text-xs"
                >
                  <Shield className="w-4 h-4" />
                  <span>Session protection enabled</span>
                </motion.div>

                {/* Actions */}
                <motion.div variants={itemVariants} className="flex gap-3">
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-[#252b3b] border border-gray-700 text-gray-300 rounded-xl hover:bg-[#2d3548] transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout Now</span>
                  </motion.button>
                  <motion.button
                    onClick={handleStayLoggedIn}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 relative overflow-hidden rounded-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-xl" />
                    <div className="relative px-4 py-3 font-semibold text-white">
                      Stay Logged In
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
}
