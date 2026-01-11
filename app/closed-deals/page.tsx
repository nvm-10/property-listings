'use client';

import { useProperties } from '@/contexts/PropertyContext';
import { Building2, Calendar, CheckCircle, Clock, DollarSign, MapPin, MessageCircle, Mail, User, TrendingUp, Home } from 'lucide-react';
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
    <div className="min-h-screen pt-20 pb-0">
      {/* Header - Dark Section */}
      <section className="bg-[--background] py-16 px-4 border-b border-[--border]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4 text-white">
              Closed <span className="text-[--primary]">Deals</span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Detroit rental properties and Michigan real estate recently sold to investors
            </p>
            <p className="text-gray-500">
              {closedProperties.length} deal{closedProperties.length !== 1 ? 's' : ''} closed
            </p>
          </motion.div>
        </div>
      </section>

      {/* Deals List - White Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">

        {/* Deals List */}
        {closedProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[--primary]/10 border border-[--primary]/20 mb-6">
              <Building2 className="w-10 h-10 text-[--primary]" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">No Closed Deals Yet</h3>
            <p className="text-slate-500 mb-8">Check back soon to see completed Detroit rental property transactions for Canadian investors</p>
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
                className="bg-white border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="grid md:grid-cols-[300px_1fr] gap-6 p-6">
                  {/* Property Image */}
                  <div className="relative h-64 md:h-auto rounded-xl overflow-hidden bg-slate-100">
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
                          <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            {property.title}
                          </h2>
                          <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">
                              {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">
                              Closed on {formatDate(property.closedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Key Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-[--primary] mb-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-xs font-medium">Price</span>
                          </div>
                          <p className="text-lg font-bold text-slate-800">
                            {formatPrice(property.price)}
                          </p>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-[--primary] mb-1">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs font-medium">ROI</span>
                          </div>
                          <p className="text-lg font-bold text-slate-800">
                            {property.roi}%
                          </p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-green-600 mb-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-xs font-medium">Cash Flow</span>
                          </div>
                          <p className="text-lg font-bold text-slate-800">
                            {formatPrice(property.cashFlow)}/mo
                          </p>
                        </div>

                        <div className="bg-slate-100 border border-slate-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-slate-500 mb-1">
                            <Building2 className="w-4 h-4" />
                            <span className="text-xs font-medium">Type</span>
                          </div>
                          <p className="text-sm font-bold text-slate-800">
                            {property.type}
                          </p>
                        </div>
                      </div>

                      {/* Property Features */}
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
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
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[--primary] flex items-center justify-center text-[--background] font-bold">
                            {property.contact.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Listing Agent</p>
                            <p className="font-semibold text-slate-800">{property.contact.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${property.contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'm inquiring about: ${property.title}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[--primary] hover:bg-[--primary-light] text-[--background] rounded-lg transition-all text-sm font-medium"
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </a>
                          <a
                            href={`mailto:${property.contact.email}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg hover:border-[--primary] hover:text-[--primary] transition-all text-sm font-medium"
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
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-[--background] text-white rounded-xl hover:bg-[--background-secondary] transition-all"
              >
                <Home className="w-5 h-5" />
                View Available Properties
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
