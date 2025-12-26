'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Heart, 
  Calendar, 
  TrendingUp,
  MapPin,
  Eye,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function BuyerDashboard() {
  const { data: session, status } = useSession();

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

  if (status === 'unauthenticated') {
    redirect('/');
  }

  if (session?.user.role !== 'buyer') {
    redirect('/dashboard/seller');
  }

  const stats = [
    {
      label: 'Properties Viewed',
      value: '12',
      icon: Eye,
      color: 'bg-[--primary]',
    },
    {
      label: 'Saved Favorites',
      value: '5',
      icon: Heart,
      color: 'bg-[--primary]',
    },
    {
      label: 'Avg. ROI Interest',
      value: '12.5%',
      icon: TrendingUp,
      color: 'bg-[--primary]',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-0 bg-[--background]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Welcome back, {session?.user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-gray-400">Your investment dashboard</p>
              </div>
            </div>
            <Link
              href="/properties"
              className="px-6 py-3 bg-[--primary] text-[--background] rounded-xl font-medium hover:bg-[--primary-light] transition-all duration-200"
            >
              Browse Properties
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all hover:border-[--border-light]"
              >
                <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-[--background]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Saved Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Heart className="w-6 h-6 mr-2 text-pink-400" />
                Saved Properties
              </h2>
              <Link
                href="/properties"
                className="text-[--primary-light] hover:text-[--primary] hover:underline text-sm font-medium"
              >
                View All
              </Link>
            </div>

            {/* Empty State */}
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[--primary]/10 border border-[--primary]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-[--primary]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No saved properties yet
              </h3>
              <p className="text-gray-400 mb-6">
                Start exploring and save properties you're interested in
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[--primary] text-[--background] rounded-xl font-medium hover:bg-[--primary-light] transition-all duration-200"
              >
                <Search className="w-5 h-5" />
                <span>Browse Properties</span>
              </Link>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >

            {/* Quick Links */}
            <div className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link
                  href="/properties"
                  className="flex items-center space-x-3 p-3 hover:bg-[--background-tertiary] rounded-xl transition-colors"
                >
                  <Building2 className="w-5 h-5 text-[--primary-light]" />
                  <span className="font-medium text-gray-300">All Properties</span>
                </Link>
                <Link
                  href="/properties?featured=true"
                  className="flex items-center space-x-3 p-3 hover:bg-[--background-tertiary] rounded-xl transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="font-medium text-gray-300">Featured Deals</span>
                </Link>
                <a
                  href="tel:1-866-964-6088"
                  className="flex items-center space-x-3 p-3 hover:bg-[--background-tertiary] rounded-xl transition-colors"
                >
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="font-medium text-gray-300">Call: 1-866-964-6088</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Getting Started Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-[--primary]/5 border border-[--primary]/20 rounded-2xl p-6"
          >
          <h3 className="text-xl font-bold text-white mb-4">
            💡 Getting Started Tips
          </h3>
            <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[--primary] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[--background] font-bold">1</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Browse Properties</h4>
                <p className="text-sm text-gray-400">
                  Explore available property listings from sellers
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[--primary] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[--background] font-bold">2</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Make an Offer</h4>
                <p className="text-sm text-gray-400">
                  Connect with sellers to negotiate and close the deal
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
