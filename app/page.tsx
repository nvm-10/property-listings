'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/contexts/PropertyContext';

export default function Home() {
  const { getAvailableProperties } = useProperties();
  const featuredProperties = getAvailableProperties()
    .filter(p => p.featured)
    .slice(0, 3);
  

  return (
    <div className="min-h-screen bg-[--background]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[--background]" />
          {/* Subtle accent glow */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[--primary]/10 border border-[--primary]/20 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-[--primary] rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">Detroit Rental Properties - Michigan Real Estate</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Detroit Rental Properties{' '}
              <span className="text-[--primary]">
                for Canadian Investors
              </span>
              <br />and Section 8 Tenants
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Invest in Michigan real estate with verified Detroit rental properties. Perfect for Canadians investing in the USA seeking turnkey rental properties with Section 8 tenants and guaranteed cash flow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/properties"
                className="group px-8 py-4 bg-[--primary] text-[--background] rounded-xl font-bold text-base flex items-center space-x-2 hover:bg-[--primary-light] transition-all shadow-lg shadow-[--primary]/20"
              >
                <span>Browse Properties</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/18669646088?text=Hi%2C%20I%27m%20interested%20in%20Detroit%20rental%20properties"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-[--border-light] text-white rounded-xl font-semibold hover:border-green-400 hover:text-green-400 transition-all flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              {[
                { label: 'Fully Renovated', icon: CheckCircle },
                { label: 'Tenant Occupied', icon: CheckCircle },
                { label: 'Positive Cash Flow', icon: CheckCircle },
                { label: 'High ROI', icon: CheckCircle }
              ].map((feature) => (
                <div key={feature.label} className="flex items-center space-x-2 text-gray-300">
                  <feature.icon className="w-5 h-5 text-[--primary]" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Featured Properties - White Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Featured Detroit <span className="text-amber-600">Rental Properties</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Turnkey Michigan real estate with Section 8 tenants. Ideal for Canadian investors seeking stable Detroit rental properties with proven cash flow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} variant="light" />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/properties"
              className="inline-flex items-center space-x-2 px-10 py-5 bg-slate-800 text-white rounded-xl text-lg font-bold hover:bg-slate-700 transition-all shadow-lg"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-[--background] text-white overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/2 -right-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[--primary]/10 border border-[--primary]/20 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-[--primary] rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">Canadian Investors Welcome - Michigan Real Estate</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-[--primary]">Invest in Detroit?</span>
            </h2>
            <p className="text-xl mb-8 text-gray-400">
              Canadians investing in the USA choose Michigan real estate for stable returns. Find Detroit rental properties with Section 8 tenants and guaranteed positive cash flow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/properties"
                className="group px-8 py-4 bg-[--primary] text-[--background] rounded-xl font-bold text-base flex items-center space-x-2 hover:bg-[--primary-light] transition-all shadow-lg shadow-[--primary]/20"
              >
                <span>Browse Properties</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/18669646088?text=Hi%2C%20I%27m%20interested%20in%20Detroit%20rental%20properties"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-[--border-light] text-white rounded-xl font-semibold hover:border-green-400 hover:text-green-400 transition-all flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
