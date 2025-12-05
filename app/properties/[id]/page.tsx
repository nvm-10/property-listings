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
  Phone,
  Mail,
  ArrowLeft,
  Check,
  Heart,
  Share2,
  Star
} from 'lucide-react';
import { useProperties } from '@/contexts/PropertyContext';
import ContactModal from '@/components/ContactModal';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getPropertyById } = useProperties();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[--primary] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">This property may have been sold or removed</p>
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

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/properties"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-[--primary] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Badge */}
            {property.featured && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[--accent] to-[--primary] text-white rounded-full font-bold"
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 text-lg mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</span>
              </div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                {property.type}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.features.bedrooms && (
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Bed className="w-6 h-6 text-[--primary]" />
                    <div>
                      <div className="font-bold text-gray-900">{property.features.bedrooms}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                  </div>
                )}
                {property.features.bathrooms && (
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Bath className="w-6 h-6 text-[--primary]" />
                    <div>
                      <div className="font-bold text-gray-900">{property.features.bathrooms}</div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Maximize className="w-6 h-6 text-[--primary]" />
                  <div>
                    <div className="font-bold text-gray-900">{property.features.sqft.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                </div>
                {property.features.yearBuilt && (
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-6 h-6 text-[--primary]" />
                    <div>
                      <div className="font-bold text-gray-900">{property.features.yearBuilt}</div>
                      <div className="text-sm text-gray-600">Year Built</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.highlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 text-gray-700">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tenant Status */}
            {property.tenantOccupied && (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Tenant Occupied</h3>
                    <p className="text-gray-600">This property has existing tenants with active lease</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Pricing & Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 space-y-6"
              >
                <div>
                  <div className="text-sm text-gray-600 mb-2">Price</div>
                  <div className="text-4xl font-bold text-gray-900">
                    {formatPrice(property.price)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y">
                  <div>
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>ROI</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {property.roi}%
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>Cash Flow</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(property.cashFlow)}
                      <span className="text-sm text-gray-600">/mo</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Contact Agent
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 py-3 border-2 border-gray-300 rounded-xl hover:border-[--primary] hover:bg-blue-50 transition-all">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Save</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-3 border-2 border-gray-300 rounded-xl hover:border-[--primary] hover:bg-blue-50 transition-all">
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">Share</span>
                  </button>
                </div>
              </motion.div>

              {/* Agent Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[--primary] to-[--accent] rounded-full flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{property.contact.name}</h3>
                    <p className="text-sm text-gray-600">Licensed Real Estate Agent</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${property.contact.phone}`}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <Phone className="w-5 h-5 text-[--primary]" />
                    <span className="text-gray-700">{property.contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${property.contact.email}`}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <Mail className="w-5 h-5 text-[--primary]" />
                    <span className="text-gray-700 text-sm">{property.contact.email}</span>
                  </a>
                </div>
              </div>

              {/* Property ID */}
              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">Property ID</div>
                <div className="text-sm font-mono text-gray-700">#{property.id}</div>
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
