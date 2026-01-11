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
    <div className="min-h-screen pt-20 pb-0 bg-[--background]">
      {/* Header */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-[--background] text-white overflow-hidden border-b border-[--border]">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/2 -right-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4">
              Detroit Rental Properties & Michigan Real Estate
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-400">
              Browse {filteredProperties.length} turnkey Detroit rental properties with Section 8 tenants. Perfect for Canadian investors seeking Michigan real estate opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 md:py-8 bg-slate-900/50 border-b border-slate-700/50">
        <div className="container mx-auto px-4">
          {/* Search and Filter Card */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-slate-700/50 shadow-xl">
            {/* Search Bar */}
            <div className="relative mb-4">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-[--primary]/10 rounded-lg">
                <Search className="w-5 h-5 text-[--primary]" />
              </div>
              <input
                type="text"
                placeholder="Search Detroit rental properties, Michigan cities, or addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-4 py-4 bg-slate-900/80 border border-slate-600 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-[--primary] outline-none transition text-base"
              />
            </div>

            {/* Filter Controls Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Type Filter */}
              <div className="flex-1 min-w-[140px]">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary] outline-none text-sm cursor-pointer"
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex-1 min-w-[160px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary] outline-none text-sm cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="roi-high">ROI: High to Low</option>
                </select>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-all text-sm ${
                  showAdvancedFilters || hasActiveFilters
                    ? 'bg-[--primary] text-slate-900'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>More Filters</span>
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
                  <div className="mt-4 pt-4 border-t border-slate-600/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Advanced Filters</h3>
                      {hasActiveFilters && (
                        <button
                          onClick={clearAdvancedFilters}
                          className="text-sm text-[--primary] hover:text-[--primary-light] flex items-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          <span>Clear All</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {/* City Filter */}
                      <div>
                        <label className="flex items-center text-xs font-medium text-slate-400 mb-2">
                          <MapPin className="w-3 h-3 mr-1 text-[--primary]" />
                          City
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary] outline-none text-sm cursor-pointer"
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
                        <label className="flex items-center text-xs font-medium text-slate-400 mb-2">
                          <DollarSign className="w-3 h-3 mr-1 text-[--primary]" />
                          Min Price
                        </label>
                        <input
                          type="number"
                          placeholder="50,000"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary] outline-none text-sm"
                        />
                      </div>

                      {/* Max Price */}
                      <div>
                        <label className="flex items-center text-xs font-medium text-slate-400 mb-2">
                          <DollarSign className="w-3 h-3 mr-1 text-[--primary]" />
                          Max Price
                        </label>
                        <input
                          type="number"
                          placeholder="200,000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary] outline-none text-sm"
                        />
                      </div>

                      {/* Min ROI */}
                      <div>
                        <label className="flex items-center text-xs font-medium text-slate-400 mb-2">
                          <TrendingUp className="w-3 h-3 mr-1 text-[--primary]" />
                          Min ROI %
                        </label>
                        <input
                          type="number"
                          placeholder="10"
                          value={minROI}
                          onChange={(e) => setMinROI(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary] outline-none text-sm"
                        />
                      </div>

                      {/* Min Bedrooms */}
                      <div>
                        <label className="flex items-center text-xs font-medium text-slate-400 mb-2">
                          <Bed className="w-3 h-3 mr-1 text-[--primary]" />
                          Bedrooms
                        </label>
                        <select
                          value={minBedrooms}
                          onChange={(e) => setMinBedrooms(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary] outline-none text-sm cursor-pointer"
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
                        <label className="flex items-center text-xs font-medium text-slate-400 mb-2">
                          <Bed className="w-3 h-3 mr-1 text-[--primary]" />
                          Bathrooms
                        </label>
                        <select
                          value={minBathrooms}
                          onChange={(e) => setMinBathrooms(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-[--primary] outline-none text-sm cursor-pointer"
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
          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-4 py-2 bg-slate-800/50 rounded-full text-sm text-slate-300">
              Showing <span className="font-semibold text-white mx-1">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
            </span>
          </div>
        </div>
      </section>

      {/* Properties Grid - White Section */}
      <section className="py-8 md:py-12 bg-white relative z-0">
        <div className="container mx-auto px-4">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} variant="light" />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No properties found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
