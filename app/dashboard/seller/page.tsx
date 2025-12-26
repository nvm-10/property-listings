'use client';

import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useProperties } from '@/contexts/PropertyContext';
import { Property } from '@/types/property';
import { evaluateFeaturedStatus } from '@/lib/featuredEvaluation';
import { 
  Building2, 
  Upload, 
  DollarSign, 
  MapPin, 
  Home, 
  Bed, 
  Bath, 
  Maximize,
  Plus,
  X,
  Check
} from 'lucide-react';

export default function SellerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addProperty } = useProperties();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  // Check seller access
  useEffect(() => {
    async function checkAccess() {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/check-seller-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email }),
          });
          const data = await response.json();
          
          if (!data.allowed) {
            // User doesn't have seller access, redirect to buyer dashboard
            router.push('/dashboard/buyer');
            return;
          }
          
          setHasAccess(true);
        } catch (error) {
          console.error('Error checking access:', error);
          router.push('/dashboard/buyer');
        }
      }
      setIsCheckingAccess(false);
    }

    if (status === 'authenticated' && session?.user.role === 'seller') {
      checkAccess();
    }
  }, [session, status, router]);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Single Family',
    price: '',
    roi: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    description: '',
    cashFlow: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  if (status === 'loading' || isCheckingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--background]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[--primary] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">
            {status === 'loading' ? 'Loading...' : 'Verifying access...'}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/');
  }

  if (session?.user.role !== 'seller') {
    redirect('/dashboard/buyer');
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload to a server and get URLs
      // For now, we'll create object URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create property object
      const newProperty: Property = {
        id: Date.now().toString(),
        title: formData.title,
        type: formData.type as Property['type'],
        price: parseFloat(formData.price),
        roi: parseFloat(formData.roi),
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        features: {
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
          sqft: parseInt(formData.sqft),
          yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
        },
        description: formData.description,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
        status: 'Available',
        cashFlow: parseFloat(formData.cashFlow),
        tenantOccupied: false,
        highlights: [],
        createdAt: new Date().toISOString(),
        featured: false, // Will be evaluated below
        contact: {
          name: formData.contactName || session?.user?.name || 'Property Owner',
          email: formData.contactEmail || session?.user?.email || '',
          phone: formData.contactPhone,
        },
      };

      // Automatically evaluate featured status based on property quality
      newProperty.featured = evaluateFeaturedStatus(newProperty);

      // Add property to context
      addProperty(newProperty);

      // Show success message
      alert('Property listed successfully!');

      // Reset form
      setFormData({
        title: '',
        type: 'Single Family',
        price: '',
        roi: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        yearBuilt: '',
        description: '',
        cashFlow: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
      });
      setImages([]);

      // Redirect to properties page
      router.push('/properties');
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Error adding property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-0 bg-[--background]">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-[--primary] rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[--background]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Seller Dashboard</h1>
              <p className="text-gray-400">Add your property listing</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-[--background-secondary] border border-[--border] rounded-2xl shadow-xl p-8 space-y-8"
        >
          {/* Images Section */}
          <div>
            <label className="block text-lg font-bold text-white mb-4">
              Property Images *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={img}
                    alt={`Property ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-square border-2 border-dashed border-[--border-light] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[--primary] hover:bg-blue-500/10 transition-all">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-400">Upload</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Home className="w-5 h-5 mr-2 text-[--primary]" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="Modern Family Home"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Property Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                >
                  <option>Single Family</option>
                  <option>Duplex</option>
                  <option>Multi-Family</option>
                  <option>Apartment</option>
                  <option>Commercial</option>
                </select>
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-[--primary]" />
              Financial Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="89900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ROI (%) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.roi}
                  onChange={(e) => setFormData({...formData, roi: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="10.02"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Cash Flow ($) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.cashFlow}
                  onChange={(e) => setFormData({...formData, cashFlow: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="750"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-[--primary]" />
              Location
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                placeholder="Street Address"
              />
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="City"
                />
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="State"
                  maxLength={2}
                />
                <input
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>

          {/* Property Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Maximize className="w-5 h-5 mr-2 text-[--primary]" />
              Property Features
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Bed className="w-4 h-4 inline mr-1" />
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Bath className="w-4 h-4 inline mr-1" />
                  Bathrooms
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sq Ft *
                </label>
                <input
                  type="number"
                  required
                  value={formData.sqft}
                  onChange={(e) => setFormData({...formData, sqft: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="1450"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year Built
                </label>
                <input
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData({...formData, yearBuilt: e.target.value})}
                  className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                  placeholder="2020"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Property Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition resize-none"
              placeholder="Describe the property, its features, and highlights..."
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-bold text-white">
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                placeholder="Your Name"
              />
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                placeholder="your@email.com"
              />
              <input
                type="tel"
                required
                value={formData.contactPhone}
                onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                className="w-full px-4 py-3 bg-[--background-tertiary] text-white placeholder-gray-500 border border-[--border-light] rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              className="px-6 py-3 border border-[--border-light] text-gray-300 rounded-xl font-medium hover:bg-[--background-tertiary] transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[--primary] text-[--background] rounded-xl font-bold hover:bg-[--primary-light] transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Publish Property</span>
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
