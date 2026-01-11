'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Building2,
  MessageCircle,
  Mail,
  ArrowLeft,
  Check,
  Home,
  Star,
  User,
  Download
} from 'lucide-react';
import { useProperties } from '@/contexts/PropertyContext';
import ContactModal from '@/components/ContactModal';
import { generatePropertyPDF } from '@/utils/pdfGenerator';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getPropertyById } = useProperties();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const foundProperty = getPropertyById(id);
    
    if (foundProperty) {
      setProperty(foundProperty);
    }
    setLoading(false);
  }, [params.id, getPropertyById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--background]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[--primary] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--background]">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-white mb-2">Property Not Found</h2>
          <p className="text-gray-400 mb-6">This property may have been sold or removed</p>
          <Link
            href="/properties"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[--primary] to-[--accent] text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Properties</span>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDownloadPDF = async () => {
    if (!property) return;
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
    <div className="min-h-screen pt-20 pb-0 bg-[--background]">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/properties"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Badge */}
            {property.featured && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[--primary] text-[--background] rounded-full font-bold"
              >
                <Star className="w-5 h-5" />
                <span>FEATURED PROPERTY</span>
              </motion.div>
            )}

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={property.images[selectedImage]}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
              
              {/* Status Badge */}
              <div className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold ${
                property.status === 'Available' 
                  ? 'bg-green-500 text-white' 
                  : property.status === 'Pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}>
                {property.status}
              </div>
            </motion.div>

            {/* Image Thumbnails */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {property.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-24 rounded-xl overflow-hidden transition-all ${
                      selectedImage === idx 
                        ? 'ring-4 ring-[--primary] scale-105' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${property.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Location */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-400 text-lg mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</span>
              </div>
              <div className="inline-block px-4 py-2 bg-[--primary]/10 border border-[--primary]/20 text-[--primary] rounded-lg font-medium">
                {property.type}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Property Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.features.bedrooms && (
                  <div className="flex items-center space-x-3 p-4 bg-[--background-tertiary] rounded-xl">
                    <Bed className="w-6 h-6 text-[--primary]" />
                    <div>
                      <div className="font-bold text-white">{property.features.bedrooms}</div>
                      <div className="text-sm text-gray-400">Bedrooms</div>
                    </div>
                  </div>
                )}
                {property.features.bathrooms && (
                  <div className="flex items-center space-x-3 p-4 bg-[--background-tertiary] rounded-xl">
                    <Bath className="w-6 h-6 text-[--primary]" />
                    <div>
                      <div className="font-bold text-white">{property.features.bathrooms}</div>
                      <div className="text-sm text-gray-400">Bathrooms</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3 p-4 bg-[--background-tertiary] rounded-xl">
                  <Maximize className="w-6 h-6 text-[--primary]" />
                  <div>
                    <div className="font-bold text-white">{property.features.sqft.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Sq Ft</div>
                  </div>
                </div>
                {property.features.yearBuilt && (
                  <div className="flex items-center space-x-3 p-4 bg-[--background-tertiary] rounded-xl">
                    <Calendar className="w-6 h-6 text-[--primary]" />
                    <div>
                      <div className="font-bold text-white">{property.features.yearBuilt}</div>
                      <div className="text-sm text-gray-400">Year Built</div>
                    </div>
                  </div>
                )}
                {property.features.units && (
                  <div className="flex items-center space-x-3 p-4 bg-[--background-tertiary] rounded-xl">
                    <Home className="w-6 h-6 text-[--primary]" />
                    <div>
                      <div className="font-bold text-white">{property.features.units}</div>
                      <div className="text-sm text-gray-400">Units</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">About This Property</h2>
                <p className="text-gray-400 leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Property Highlights</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.highlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[--primary]/10 border border-[--primary]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[--primary]" />
                      </div>
                      <span className="text-gray-400">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tenant Status */}
            {property.tenantOccupied && (
              <div className="bg-[--success]/10 border border-[--success]/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[--success]/20 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-[--success]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Tenant Occupied</h3>
                    <p className="text-gray-400">This property has active tenants with positive cash flow</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Price & Contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price Card */}
            <div className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-6 sticky top-24">
              <div className="space-y-6">
                {/* Price */}
                <div>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Asking Price</span>
                  </div>
                  <div className="text-4xl font-bold text-white">
                    {formatPrice(property.price)}
                  </div>
                </div>

                <div className="border-t border-[--border-light] pt-6 space-y-4">
                  {/* ROI */}
                  <div className="flex items-center justify-between p-4 bg-[--primary]/10 border border-[--primary]/20 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-[--primary]" />
                      <span className="text-gray-400">ROI</span>
                    </div>
                    <span className="text-2xl font-bold text-[--primary]">{property.roi}%</span>
                  </div>

                  {/* Cash Flow */}
                  <div className="flex items-center justify-between p-4 bg-[--success]/10 border border-[--success]/20 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-[--success]" />
                      <span className="text-gray-400">Monthly Cash Flow</span>
                    </div>
                    <span className="text-2xl font-bold text-[--success]">{formatPrice(property.cashFlow)}</span>
                  </div>
                </div>

                {/* Download PDF Button */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="w-full py-4 bg-[--background-tertiary] border border-[--border-light] text-white font-bold rounded-xl hover:bg-[--background] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  <span>{isDownloading ? 'Generating...' : 'Download Details'}</span>
                </button>

                {/* Contact Button */}
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full py-4 bg-[--primary] text-[--background] font-bold rounded-xl hover:bg-[--primary-light] transition-all duration-200"
                >
                  Contact Seller
                </button>

                {/* Contact Info */}
                <div className="border-t border-[--border-light] pt-6">
                  <h3 className="text-sm font-semibold text-white mb-4">Listed By</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[--primary] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-[--background]" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{property.contact.name}</div>
                          <div className="text-sm text-gray-500">Property Agent</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <a 
                          href={`https://wa.me/${property.contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in: ${property.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="flex items-center space-x-2 text-gray-400 hover:text-[--primary] transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 text-[--primary]" />
                          <span>WhatsApp</span>
                        </a>
                      <a href={`mailto:${property.contact.email}`} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                        <span>{property.contact.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </div>
  );
}
