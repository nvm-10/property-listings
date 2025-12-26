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
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-gradient-to-br from-[--background] via-blue-950/50 to-purple-950/50 text-white overflow-hidden border-b border-[--border]">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwxMzAsMjQ2LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/2 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/2 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4">
              Investment Properties
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-400">
              Browse {filteredProperties.length} available investment opportunities with high ROI
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 md:py-6 bg-[#121827] border-b border-[--border] sticky top-20 z-40 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-3">
            {/* Main Filter Row */}
            <div className="flex flex-col gap-3">
            {/* Search - Full width on mobile */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-[--background-tertiary] border border-[--border-light] text-white placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none transition text-sm md:text-base"
              />
            </div>

              {/* Filter Controls Row */}
              <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:gap-3">
              {/* Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-2 md:px-4 py-2.5 md:py-3 bg-[--background-tertiary] border border-[--border-light] text-white rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none text-xs md:text-sm"
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 md:px-4 py-2.5 md:py-3 bg-[--background-tertiary] border border-[--border-light] text-white rounded-xl focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none text-xs md:text-sm"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="roi-high">ROI: High to Low</option>
              </select>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center justify-center space-x-1 md:space-x-2 px-2 md:px-4 py-2.5 md:py-3 rounded-xl font-medium transition-all text-xs md:text-sm ${
                  showAdvancedFilters || hasActiveFilters
                    ? 'bg-gradient-to-r from-[--primary] to-[--accent] text-white'
                    : 'border border-[--border-light] text-gray-300 hover:bg-[--background-tertiary]'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden md:inline">Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-white rounded-full" />
                )}
              </button>
              </div>
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
                  <div className="pt-3 md:pt-4 border-t border-[--border-light]">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-base md:text-lg font-bold text-white">Advanced Filters</h3>
                      {hasActiveFilters && (
                        <button
                          onClick={clearAdvancedFilters}
                          className="text-xs md:text-sm text-[--primary-light] hover:text-[--primary] hover:underline flex items-center space-x-1"
                        >
                          <X className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Clear All</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                      {/* City Filter */}
                      <div>
                        <label className="flex items-center text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400" />
                          City
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-2 md:px-3 py-2 bg-[--background-tertiary] border border-[--border-light] text-white rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none text-xs md:text-sm"
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
                        <label className="flex items-center text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                          <DollarSign className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400" />
                          Min Price
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 50000"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full px-2 md:px-3 py-2 bg-[--background-tertiary] border border-[--border-light] text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none text-xs md:text-sm"
                        />
                      </div>

                      {/* Max Price */}
                      <div>
                        <label className="flex items-center text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                          <DollarSign className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400" />
                          Max Price
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 200000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full px-2 md:px-3 py-2 bg-[--background-tertiary] border border-[--border-light] text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none text-xs md:text-sm"
                        />
                      </div>

                      {/* Min ROI */}
                      <div>
                        <label className="flex items-center text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                          <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400" />
                          Min ROI %
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 10"
                          value={minROI}
                          onChange={(e) => setMinROI(e.target.value)}
                          className="w-full px-2 md:px-3 py-2 bg-[--background-tertiary] border border-[--border-light] text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none text-xs md:text-sm"
                        />
                      </div>

                      {/* Min Bedrooms */}
                      <div>
                        <label className="flex items-center text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                          <Bed className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400" />
                          Min Bedrooms
                        </label>
                        <select
                          value={minBedrooms}
                          onChange={(e) => setMinBedrooms(e.target.value)}
                          className="w-full px-2 md:px-3 py-2 bg-[--background-tertiary] border border-[--border-light] text-white rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none text-xs md:text-sm"
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
                        <label className="flex items-center text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                          <Bed className="w-3 h-3 md:w-4 md:h-4 mr-1 text-gray-400" />
                          Min Bathrooms
                        </label>
                        <select
                          value={minBathrooms}
                          onChange={(e) => setMinBathrooms(e.target.value)}
                          className="w-full px-2 md:px-3 py-2 bg-[--background-tertiary] border border-[--border-light] text-white rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent outline-none text-xs md:text-sm"
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
          <div className="mt-3 md:mt-4 text-center text-gray-400 text-xs md:text-sm">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-8 md:py-12 bg-[--background] relative z-0">
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
              <h3 className="text-2xl font-bold text-white mb-2">No properties found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
