'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/contexts/PropertyContext';
import { Property } from '@/types/property';
import { Search, SlidersHorizontal, X, MapPin, DollarSign, Bed, TrendingUp } from 'lucide-react';
import { calculateFeaturedScore } from '@/lib/featuredEvaluation';

export default function PropertiesPage() {
  const { getAvailableProperties } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Advanced filters
  const [city, setCity] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minBedrooms, setMinBedrooms] = useState<string>('');
  const [minBathrooms, setMinBathrooms] = useState<string>('');
  const [minROI, setMinROI] = useState<string>('');

  // Get only available properties
  const availableProperties = getAvailableProperties();

  // Get unique cities from available properties
  const cities = ['all', ...new Set(availableProperties.map(p => p.location.city))];

  // Filter and sort properties
  let filteredProperties = availableProperties.filter(property => {
    // Basic search
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = filterType === 'all' || property.type === filterType;
    
    // City filter
    const matchesCity = city === 'all' || property.location.city === city;
    
    // Price range
    const matchesMinPrice = !minPrice || property.price >= parseFloat(minPrice);
    const matchesMaxPrice = !maxPrice || property.price <= parseFloat(maxPrice);
    
    // Bedrooms filter
    const matchesBedrooms = !minBedrooms || (property.features.bedrooms && property.features.bedrooms >= parseInt(minBedrooms));
    
    // Bathrooms filter
    const matchesBathrooms = !minBathrooms || (property.features.bathrooms && property.features.bathrooms >= parseInt(minBathrooms));
    
    // ROI filter
    const matchesROI = !minROI || property.roi >= parseFloat(minROI);
    
    return matchesSearch && matchesType && matchesCity && matchesMinPrice && 
           matchesMaxPrice && matchesBedrooms && matchesBathrooms && matchesROI;
  });

  // Sort properties
  filteredProperties = filteredProperties.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'roi-high':
        return b.roi - a.roi;
      case 'featured':
      default:
        // Sort by featured status first, then by featured score
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.featured && b.featured) {
          return calculateFeaturedScore(b) - calculateFeaturedScore(a);
        }
        // For non-featured, sort by newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const propertyTypes = ['all', 'Single Family', 'Duplex', 'Multi-Family', 'Apartment', 'Commercial'];

  const clearAdvancedFilters = () => {
    setCity('all');
    setMinPrice('');
    setMaxPrice('');
    setMinBedrooms('');
    setMinBathrooms('');
    setMinROI('');
  };

  const hasActiveFilters = city !== 'all' || minPrice || maxPrice || minBedrooms || minBathrooms || minROI;

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Investment Properties
            </h1>
            <p className="text-xl text-blue-100">
              Browse our extensive portfolio of turnkey real estate opportunities in Detroit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Main Filter Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition"
              />
            </div>

              {/* Type Filter */}
              <div className="flex items-center space-x-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none bg-white"
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none bg-white"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="roi-high">ROI: High to Low</option>
              </select>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  showAdvancedFilters || hasActiveFilters
                    ? 'bg-[--primary] text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showAdvancedFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Advanced Filters</h3>
                      {hasActiveFilters && (
                        <button
                          onClick={clearAdvancedFilters}
                          className="text-sm text-[--primary] hover:underline flex items-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>Clear All</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* City Filter */}
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                          City
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none bg-white"
                        >
                          {cities.map(c => (
                            <option key={c} value={c}>
                              {c === 'all' ? 'All Cities' : c}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Min Price */}
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
                          Min Price
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 50000"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none"
                        />
                      </div>

                      {/* Max Price */}
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
                          Max Price
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 200000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none"
                        />
                      </div>

                      {/* Min ROI */}
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <TrendingUp className="w-4 h-4 mr-1 text-gray-500" />
                          Min ROI %
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 10"
                          value={minROI}
                          onChange={(e) => setMinROI(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none"
                        />
                      </div>

                      {/* Min Bedrooms */}
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Bed className="w-4 h-4 mr-1 text-gray-500" />
                          Min Bedrooms
                        </label>
                        <select
                          value={minBedrooms}
                          onChange={(e) => setMinBedrooms(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none bg-white"
                        >
                          <option value="">Any</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                          <option value="5">5+</option>
                        </select>
                      </div>

                      {/* Min Bathrooms */}
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                          <Bed className="w-4 h-4 mr-1 text-gray-500" />
                          Min Bathrooms
                        </label>
                        <select
                          value={minBathrooms}
                          onChange={(e) => setMinBathrooms(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none bg-white"
                        >
                          <option value="">Any</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center text-gray-600">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
