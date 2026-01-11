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
  ChevronUp,
  Download
} from 'lucide-react';
import ContactModal from './ContactModal';
import { generatePropertyPDF } from '@/utils/pdfGenerator';

interface PropertyCardProps {
  property: Property;
  index?: number;
  variant?: 'dark' | 'light';
}

export default function PropertyCard({ property, index = 0, variant = 'dark' }: PropertyCardProps) {
  const isLight = variant === 'light';
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDownloadPDF = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    try {
      await generatePropertyPDF(property);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 card-hover cursor-pointer ${
        isLight 
          ? 'bg-white border border-gray-200' 
          : 'bg-[--background-secondary] border border-[--border]'
      }`}
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
            <h3 className={`text-xl font-bold transition-colors line-clamp-1 ${
              isLight ? 'text-slate-800 hover:text-[--primary]' : 'text-white hover:text-[--primary-light]'
            }`}>
              {property.title}
            </h3>
          </Link>
          <div className={`flex items-center mt-2 text-sm ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.location.city}, {property.location.state}</span>
          </div>
        </div>

        {/* Property Type */}
        <div className="inline-block px-3 py-1 bg-[--primary]/10 text-[--primary] text-sm font-medium rounded-lg border border-[--primary]/20">
          {property.type}
        </div>

        {/* Features */}
        <div className={`flex items-center justify-between text-sm ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
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
        <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-gray-200' : 'border-[--border-light]'}`}>
          <div>
            <div className={`flex items-center space-x-1 text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-gray-500'}`}>
              <DollarSign className="w-3 h-3" />
              <span>Price</span>
            </div>
            <div className={`text-2xl font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
              {formatPrice(property.price)}
            </div>
          </div>
          <div className="text-right">
            <div className={`flex items-center justify-end space-x-1 text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-gray-500'}`}>
              <TrendingUp className="w-3 h-3" />
              <span>ROI</span>
            </div>
            <div className="text-2xl font-bold text-[--primary]">
              {property.roi}%
            </div>
          </div>
        </div>

        {/* Cash Flow */}
        <div className={`flex items-center justify-between p-3 rounded-lg ${
          isLight 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-[--success]/10 border border-[--success]/20'
        }`}>
          <span className={`text-sm font-medium ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>Monthly Cash Flow</span>
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
            className={`space-y-4 pt-4 border-t ${isLight ? 'border-gray-200' : 'border-[--border-light]'}`}
          >
            {/* Property Type & Year */}
            <div className="grid grid-cols-2 gap-3">
              {property.features.yearBuilt && (
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className={`w-4 h-4 ${isLight ? 'text-slate-400' : 'text-gray-500'}`} />
                  <div>
                    <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-gray-500'}`}>Year Built</div>
                    <div className={`font-medium ${isLight ? 'text-slate-800' : 'text-white'}`}>{property.features.yearBuilt}</div>
                  </div>
                </div>
              )}
              {property.features.units && (
                <div className="flex items-center space-x-2 text-sm">
                  <Home className={`w-4 h-4 ${isLight ? 'text-slate-400' : 'text-gray-500'}`} />
                  <div>
                    <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-gray-500'}`}>Units</div>
                    <div className={`font-medium ${isLight ? 'text-slate-800' : 'text-white'}`}>{property.features.units}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h4 className={`text-sm font-semibold mb-2 ${isLight ? 'text-slate-800' : 'text-white'}`}>Description</h4>
                <p className={`text-sm line-clamp-3 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>{property.description}</p>
              </div>
            )}

            {/* Location Details */}
            <div>
              <h4 className={`text-sm font-semibold mb-2 ${isLight ? 'text-slate-800' : 'text-white'}`}>Location</h4>
              <div className={`text-sm ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                <div>{property.location.address}</div>
                <div>{property.location.city}, {property.location.state} {property.location.zipCode}</div>
              </div>
            </div>

            {/* Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div>
                <h4 className={`text-sm font-semibold mb-2 ${isLight ? 'text-slate-800' : 'text-white'}`}>Highlights</h4>
                <div className="space-y-1">
                  {property.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className={`flex items-start space-x-2 text-sm ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
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
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center justify-center space-x-1 py-3 font-semibold rounded-xl transition-all text-sm ${
              isLight 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-[--background-tertiary] border border-[--border-light] text-white hover:bg-[--background]'
            }`}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="hidden sm:inline">Less</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="hidden sm:inline">More</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex items-center justify-center space-x-1 py-3 font-semibold rounded-xl transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
              isLight 
                ? 'bg-slate-600 text-white hover:bg-slate-500' 
                : 'bg-[--background-tertiary] border border-[--border-light] text-white hover:bg-[--background]'
            }`}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{isDownloading ? '...' : 'PDF'}</span>
          </button>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className={`flex items-center justify-center space-x-1 py-3 font-bold rounded-xl transition-all duration-200 text-sm ${
              isLight
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-[--primary] text-[--background] hover:bg-[--primary-light]'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Contact</span>
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
