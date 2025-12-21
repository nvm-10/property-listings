'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/contexts/PropertyContext';
import { Building2, Trash2, Edit, Eye, DollarSign, TrendingUp, Calendar, MapPin, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { properties, deleteProperty, updatePropertyStatus } = useProperties();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle redirects with useEffect
  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'admin')) {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--background]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading while redirecting non-admin users
  if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--background]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  const handleDeleteClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProperty) {
      deleteProperty(selectedProperty);
      setShowDeleteConfirm(false);
      setSelectedProperty(null);
    }
  };

  const handleStatusChange = (propertyId: string, newStatus: 'Available' | 'Pending' | 'Sold') => {
    updatePropertyStatus(propertyId, newStatus);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const stats = {
    total: properties.length,
    available: properties.filter(p => p.status === 'Available').length,
    pending: properties.filter(p => p.status === 'Pending').length,
    sold: properties.filter(p => p.status === 'Sold').length,
  };

  return (
    <div className="min-h-screen bg-[--background] pt-20 pb-0 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Manage all property listings and system settings
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6 border-l-4 border-emerald-500"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm font-medium">Total Properties</span>
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6 border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm font-medium">Available</span>
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.available}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6 border-l-4 border-yellow-500"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm font-medium">Pending</span>
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.pending}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6 border-l-4 border-green-500"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm font-medium">Sold</span>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.sold}</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard/seller"
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Add New Property
            </Link>
            <Link
              href="/properties"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View All Listings
            </Link>
            <Link
              href="/closed-deals"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Closed Deals
            </Link>
          </div>
        </motion.div>

        {/* All Properties List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-white">All Property Listings</h2>
            <p className="text-gray-400 text-sm mt-1">Manage, edit, or delete any property</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[--background-tertiary] border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Listed
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {properties.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No properties found
                    </td>
                  </tr>
                ) : (
                  properties.map((property) => (
                    <tr key={property.id} className="hover:bg-[--background-tertiary] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-[--background-tertiary] flex-shrink-0">
                            {property.images && property.images.length > 0 ? (
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-gray-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{property.title}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{property.location.city}, {property.location.state}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-white">{formatPrice(property.price)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            <span>{property.roi}% ROI</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={property.status}
                          onChange={(e) => handleStatusChange(property.id, e.target.value as any)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-colors ${
                            property.status === 'Available'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : property.status === 'Pending'
                              ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              : 'bg-green-50 text-green-700 border-green-200'
                          }`}
                        >
                          <option value="Available">Available</option>
                          <option value="Pending">Pending</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(property.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/properties/${property.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View property"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(property.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete property"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete Property</h3>
                <p className="text-sm text-gray-400">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this property? All data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedProperty(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
