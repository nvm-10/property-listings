'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  TrendingUp, 
  DollarSign,
  Check,
  MessageCircle,
  Calendar,
  Home,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ContactModal from './ContactModal';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[--background-secondary] border border-[--border] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 card-hover cursor-pointer"
    >
      {/* Featured Badge */}
      {property.featured && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[--primary] text-[--background] text-xs font-bold rounded-full">
          FEATURED
        </div>
      )}

      {/* Status Badge */}
      <div className={`absolute top-4 right-4 z-10 px-3 py-1 text-xs font-bold rounded-full ${
        property.status === 'Available' 
          ? 'bg-green-500 text-white' 
          : property.status === 'Pending'
          ? 'bg-yellow-500 text-white'
          : 'bg-gray-500 text-white'
      }`}>
        {property.status}
      </div>

      {/* Image */}
      <Link href={`/properties/${property.id}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title and Location */}
        <div>
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-xl font-bold text-white hover:text-[--primary-light] transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center mt-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.location.city}, {property.location.state}</span>
          </div>
        </div>

        {/* Property Type */}
        <div className="inline-block px-3 py-1 bg-[--primary]/10 text-[--primary] text-sm font-medium rounded-lg border border-[--primary]/20">
          {property.type}
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-gray-400 text-sm">
          {property.features.bedrooms && (
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span>{property.features.bedrooms} Beds</span>
            </div>
          )}
          {property.features.bathrooms && (
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span>{property.features.bathrooms} Baths</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Maximize className="w-4 h-4" />
            <span>{property.features.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Price and ROI */}
        <div className="flex items-center justify-between pt-4 border-t border-[--border-light]">
          <div>
            <div className="flex items-center space-x-1 text-gray-500 text-xs mb-1">
              <DollarSign className="w-3 h-3" />
              <span>Price</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatPrice(property.price)}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-1 text-gray-500 text-xs mb-1">
              <TrendingUp className="w-3 h-3" />
              <span>ROI</span>
            </div>
            <div className="text-2xl font-bold text-[--primary]">
              {property.roi}%
            </div>
          </div>
        </div>

        {/* Cash Flow */}
        <div className="flex items-center justify-between p-3 bg-[--success]/10 border border-[--success]/20 rounded-lg">
          <span className="text-sm font-medium text-gray-300">Monthly Cash Flow</span>
          <span className="text-lg font-bold text-[--success]">
            {formatPrice(property.cashFlow)}
          </span>
        </div>

        {/* Tenant Status */}
        {property.tenantOccupied && (
          <div className="flex items-center space-x-2 text-sm text-[--success]">
            <div className="w-6 h-6 bg-[--success]/10 border border-[--success]/20 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-medium">Tenant Occupied</span>
          </div>
        )}

        {/* Expandable Details Section */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4 border-t border-[--border-light]"
          >
            {/* Property Type & Year */}
            <div className="grid grid-cols-2 gap-3">
              {property.features.yearBuilt && (
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-gray-500 text-xs">Year Built</div>
                    <div className="text-white font-medium">{property.features.yearBuilt}</div>
                  </div>
                </div>
              )}
              {property.features.units && (
                <div className="flex items-center space-x-2 text-sm">
                  <Home className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-gray-500 text-xs">Units</div>
                    <div className="text-white font-medium">{property.features.units}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Description</h4>
                <p className="text-sm text-gray-400 line-clamp-3">{property.description}</p>
              </div>
            )}

            {/* Location Details */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Location</h4>
              <div className="text-sm text-gray-400">
                <div>{property.location.address}</div>
                <div>{property.location.city}, {property.location.state} {property.location.zipCode}</div>
              </div>
            </div>

            {/* Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Highlights</h4>
                <div className="space-y-1">
                  {property.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[--primary] mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center space-x-2 py-3 bg-[--background-tertiary] border border-[--border-light] text-white font-semibold rounded-xl hover:bg-[--background] transition-all"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>Less Info</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>More Info</span>
              </>
            )}
          </button>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center justify-center space-x-2 py-3 bg-[--primary] text-[--background] font-bold rounded-xl hover:bg-[--primary-light] transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact</span>
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        propertyId={property.id}
        propertyTitle={property.title}
        contact={property.contact}
      />
    </motion.div>
  );
}
