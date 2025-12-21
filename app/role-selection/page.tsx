'use client';

import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building2, Search, ArrowRight, Lock, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function RoleSelectionPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSellerAllowed, setIsSellerAllowed] = useState(false);
  const [isAdminAllowed, setIsAdminAllowed] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  // Check if user is whitelisted for seller and admin access
  useEffect(() => {
    async function checkAccess() {
      if (session?.user?.email) {
        try {
          // Check seller access
          const sellerResponse = await fetch('/api/check-seller-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email }),
          });
          const sellerData = await sellerResponse.json();
          setIsSellerAllowed(sellerData.allowed);

          // Check admin access
          const adminResponse = await fetch('/api/check-admin-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email }),
          });
          const adminData = await adminResponse.json();
          setIsAdminAllowed(adminData.allowed);
        } catch (error) {
          console.error('Error checking access:', error);
          setIsSellerAllowed(false);
          setIsAdminAllowed(false);
        }
      }
      setIsCheckingAccess(false);
    }
    if (status === 'authenticated') {
      checkAccess();
    }
  }, [session, status]);

  // Handle redirects with useEffect to avoid hooks violations
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (session?.user?.role && session.user.role !== 'buyer') {
      router.push(`/dashboard/${session.user.role}`);
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--background]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[--primary] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading while checking conditions
  if (status === 'unauthenticated' || (session?.user?.role && session.user.role !== 'buyer')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--background]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[--primary] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  const handleRoleSelection = async (role: 'buyer' | 'seller' | 'admin') => {
    setIsSubmitting(true);
    try {
      // Update session with selected role
      await update({ role });
      
      // Redirect to appropriate dashboard
      router.push(`/dashboard/${role}`);
    } catch (error) {
      console.error('Error updating role:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[--background] via-blue-950/50 to-purple-950/50 p-4 pb-0 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwxMzAsMjQ2LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full relative z-10"
      >
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-[--primary] to-[--accent] rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Building2 className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Welcome, {session?.user?.name?.split(' ')[0]}! 👋
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400"
          >
            How would you like to use PropertyHub?
          </motion.p>
        </div>

        {/* Role Selection Cards */}
        <div className={`grid gap-6 ${isAdminAllowed ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {/* Buyer/Investor Card */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelection('buyer')}
            disabled={isSubmitting}
            className="group relative bg-[--background-secondary] border border-[--border] rounded-3xl shadow-xl p-8 text-left transition-all hover:shadow-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                I'm a Buyer/Investor
              </h2>
              
              <p className="text-gray-400 mb-6">
                Browse and invest in real estate properties. Find investment opportunities.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  <span>Search and filter properties</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  <span>Schedule property visits</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  <span>Save favorite listings</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  <span>View ROI and cash flow</span>
                </div>
              </div>
              
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                <span>Continue as Investor</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </motion.button>

          {/* Seller/Agent Card */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={isSellerAllowed ? { scale: 1.02, y: -5 } : {}}
            whileTap={isSellerAllowed ? { scale: 0.98 } : {}}
            onClick={() => isSellerAllowed && handleRoleSelection('seller')}
            disabled={isSubmitting || !isSellerAllowed || isCheckingAccess}
            className={`group relative bg-[--background-secondary] border border-[--border] rounded-3xl shadow-xl p-8 text-left transition-all overflow-hidden ${
              isSellerAllowed
                ? 'hover:shadow-2xl cursor-pointer'
                : 'opacity-60 cursor-not-allowed'
            } ${isSubmitting && 'opacity-50'}`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity ${
              isSellerAllowed ? 'group-hover:opacity-100' : ''
            }`} />
            
            {/* Access Restricted Badge */}
            {!isSellerAllowed && !isCheckingAccess && (
              <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-gray-200 rounded-full flex items-center space-x-1">
                <Lock className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-400">Restricted</span>
              </div>
            )}
            
            {/* Content */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                I'm a Seller/Agent
              </h2>
              
              <p className="text-gray-400 mb-6">
                {isSellerAllowed || isCheckingAccess
                  ? 'List and manage properties. Connect with serious investors looking for opportunities.'
                  : 'Seller access is restricted. Contact support to request access.'}
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                  <span>Add property listings</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                  <span>Upload property images</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                  <span>Manage listing status</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                  <span>Receive inquiries</span>
                </div>
              </div>
              
              <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                <span>Continue as Seller</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </motion.button>

          {/* Admin Card */}
          {isAdminAllowed && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelection('admin')}
              disabled={isSubmitting}
              className="group relative bg-[--background-secondary] border border-[--border] rounded-3xl shadow-xl p-8 text-left transition-all hover:shadow-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3">
                  I'm an Admin
                </h2>
                
                <p className="text-gray-400 mb-6">
                  Manage all listings, users, and system settings. Full control over the platform.
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                    <span>Add/remove all listings</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                    <span>Manage property status</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                    <span>View analytics</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                    <span>System administration</span>
                  </div>
                </div>
                
                <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-2 transition-transform">
                  <span>Continue as Admin</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </motion.button>
          )}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Don't worry, you can change your role later in settings
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
