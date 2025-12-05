'use client';

import { useProperties } from '@/contexts/PropertyContext';
import { Building2, Calendar, CheckCircle, Clock, DollarSign, MapPin, Phone, Mail, User, TrendingUp, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ClosedDealsPage() {
  const { getClosedProperties } = useProperties();
  const closedProperties = getClosedProperties();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Closed Deals
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Recently sold and pending properties
          </p>
          <p className="text-gray-500">
            {closedProperties.length} deal{closedProperties.length !== 1 ? 's' : ''} closed
          </p>
        </motion.div>

        {/* Deals List */}
        {closedProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
              <Building2 className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Closed Deals Yet</h3>
            <p className="text-gray-600 mb-8">Check back soon to see completed transactions</p>
            <Link
              href="/properties"
              className="btn-3d-primary inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold"
            >
              <Home className="w-5 h-5" />
              Browse Available Properties
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {closedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="grid md:grid-cols-[300px_1fr] gap-6 p-6">
                  {/* Property Image */}
                  <div className="relative h-64 md:h-auto rounded-xl overflow-hidden bg-gray-100">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {property.status === 'Sold' ? (
                        <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                          <CheckCircle className="w-4 h-4" />
                          Sold
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                          <Clock className="w-4 h-4" />
                          Pending
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex flex-col justify-between">
                    {/* Header Section */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {property.title}
                          </h2>
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">
                              {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">
                              Closed on {formatDate(property.closedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Key Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-blue-600 mb-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-xs font-medium">Price</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {formatPrice(property.price)}
                          </p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-purple-600 mb-1">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs font-medium">ROI</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {property.roi}%
                          </p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-green-600 mb-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-xs font-medium">Cash Flow</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {formatPrice(property.cashFlow)}/mo
                          </p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-orange-600 mb-1">
                            <Building2 className="w-4 h-4" />
                            <span className="text-xs font-medium">Type</span>
                          </div>
                          <p className="text-sm font-bold text-gray-900">
                            {property.type}
                          </p>
                        </div>
                      </div>

                      {/* Property Features */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        {property.features.bedrooms && (
                          <span>{property.features.bedrooms} bed</span>
                        )}
                        {property.features.bathrooms && (
                          <span>{property.features.bathrooms} bath</span>
                        )}
                        {property.features.sqft && (
                          <span>{property.features.sqft.toLocaleString()} sqft</span>
                        )}
                        {property.features.units && property.features.units > 1 && (
                          <span>{property.features.units} units</span>
                        )}
                        {property.features.yearBuilt && (
                          <span>Built {property.features.yearBuilt}</span>
                        )}
                      </div>
                    </div>

                    {/* Agent Contact Section */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                            {property.contact.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Listing Agent</p>
                            <p className="font-semibold text-gray-900">{property.contact.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${property.contact.phone}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                          <a
                            href={`mailto:${property.contact.email}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Back to Properties Link */}
        {closedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/properties"
              className="btn-3d-white inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold"
            >
              <Home className="w-5 h-5" />
              View Available Properties
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
