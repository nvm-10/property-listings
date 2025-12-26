'use client';

import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoogleSignIn = async () => {
    await signIn('google', {
      callbackUrl: '/role-selection',
      redirect: true,
    });
  };

  const features = [
    { text: 'Browse and invest in properties', color: 'from-blue-500 to-cyan-500' },
    { text: 'List and manage your properties', color: 'from-purple-500 to-pink-500' },
    { text: 'Schedule property visits', color: 'from-emerald-500 to-teal-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
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

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    }),
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
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
              className="bg-[#1a1f2e] rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-700 my-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Animated Header */}
              <div className="relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[--primary] via-[--accent] to-purple-600"
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
                  {/* Close button */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center"
                  >
                    {/* Animated Logo */}
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
                        <Building2 className="w-8 h-8" />
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
                      Welcome Back
                    </motion.h2>
                    <motion.p
                      variants={itemVariants}
                      className="text-center text-blue-100/90 text-sm"
                    >
                      Sign in to continue
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
                {/* Google Sign In Button */}
                <motion.button
                  variants={itemVariants}
                  onClick={handleGoogleSignIn}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full relative overflow-hidden rounded-2xl transition-all duration-300"
                >
                  {/* Button background with gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[--primary] via-[--accent] to-purple-500 rounded-2xl" />
                  <div className="absolute inset-[2px] bg-[#1a1f2e] rounded-[14px]" />
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-center space-x-3 px-6 py-4">
                    {/* Google Icon */}
                    <div className="relative">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-base">Continue with Google</span>
                    <motion.div
                      className="text-white/70"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Hover shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>

                {/* Security badge */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center space-x-2 mt-4 text-gray-400 text-xs"
                >
                  <Shield className="w-4 h-4" />
                  <span>Secured with Google OAuth 2.0</span>
                </motion.div>

                {/* Divider */}
                <motion.div
                  variants={itemVariants}
                  className="relative my-4"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[--border-light]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-sm text-gray-400 bg-[#1a1f2e]">
                      What you can do
                    </span>
                  </div>
                </motion.div>

                {/* Features */}
                <div className="space-y-3">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={featureVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ x: 4 }}
                      className="flex items-center space-x-3 p-2.5 rounded-xl bg-[#252b3b] hover:bg-[#2d3548] transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <motion.p
                  variants={itemVariants}
                  className="text-xs text-gray-500 text-center mt-6 leading-relaxed"
                >
                  By continuing, you agree to our{' '}
                  <span className="text-[--primary-light] hover:underline cursor-pointer">Terms of Service</span>
                  {' '}and{' '}
                  <span className="text-[--primary-light] hover:underline cursor-pointer">Privacy Policy</span>
                </motion.p>
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
