'use client';

import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Chrome, Building2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const handleGoogleSignIn = async () => {
    // Sign in with Google, redirect to role selection page after
    await signIn('google', {
      callbackUrl: '/role-selection',
      redirect: true,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-[--primary] to-[--accent] p-8 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Building2 className="w-8 h-8" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-center mb-2">
                  Welcome to PropertyHub
                </h2>
                <p className="text-center text-blue-100">
                  Sign in to start your real estate journey
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Sign in to continue
                </h3>
                <p className="text-gray-600 mb-8 text-center">
                  Access your dashboard and start your real estate journey
                </p>

                {/* Google Sign In Button */}
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-medium text-gray-700 shadow-sm hover:shadow-md"
                >
                  <Chrome className="w-5 h-5 text-blue-500" />
                  <span>Continue with Google</span>
                </button>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    After signing in, you can:
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[--primary] rounded-full"></div>
                      <span>Browse and invest in properties</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>List and manage your properties</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Schedule property visits</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
