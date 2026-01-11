'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building2, MapPin, DollarSign, TrendingUp, Shield, Users, Home } from 'lucide-react';

export default function BlogPage() {
  const articles = [
    {
      title: "Why Canadian Investors Choose Detroit Rental Properties",
      excerpt: "Discover why Detroit rental properties have become the top choice for Canadians investing in the USA. Learn about ROI, Section 8 tenants, and cash flow opportunities.",
      icon: MapPin,
      color: "amber",
    },
    {
      title: "Section 8 Tenants: A Guide for Michigan Real Estate Investors",
      excerpt: "Everything you need to know about Section 8 tenants in Michigan. Guaranteed rent, stable income, and government-backed payments make these properties ideal.",
      icon: Shield,
      color: "green",
    },
    {
      title: "Michigan Real Estate Market: 2026 Investment Guide",
      excerpt: "Current trends in Michigan real estate show strong growth. Detroit rental properties continue to offer exceptional value for Canadian and international investors.",
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Turnkey Detroit Rental Properties: What You Need to Know",
      excerpt: "Fully renovated, tenant-occupied properties ready for immediate cash flow. Learn why turnkey Detroit rental properties are perfect for hands-off investors.",
      icon: Home,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-0">
      {/* Header Section - Dark */}
      <section className="relative bg-[--background] py-24 px-4 border-b border-[--border] overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[--primary]/10 border border-[--primary]/20 rounded-full mb-6">
              <div className="w-2 h-2 bg-[--primary] rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">Investment Insights</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Detroit Rental Properties & <span className="text-[--primary]">Michigan Real Estate</span> Insights
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Expert guides for Canadian investors seeking turnkey Detroit rental properties with Section 8 tenants and guaranteed cash flow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article - White Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[--primary]/20 rounded-full mb-4 w-fit">
                  <span className="text-xs font-bold text-[--primary]">FEATURED</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Complete Guide: Canadians Investing in the USA
                </h2>
                <p className="text-gray-300 mb-6">
                  A comprehensive guide for Canadian investors looking to invest in Michigan real estate. Learn about cross-border investing, tax implications, financing options, and why Detroit rental properties offer the best ROI for international investors.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-[--primary]/10 text-[--primary] rounded-full text-sm font-medium border border-[--primary]/20">
                    Canadian Investors
                  </span>
                  <span className="px-3 py-1 bg-[--primary]/10 text-[--primary] rounded-full text-sm font-medium border border-[--primary]/20">
                    Detroit Properties
                  </span>
                  <span className="px-3 py-1 bg-[--primary]/10 text-[--primary] rounded-full text-sm font-medium border border-[--primary]/20">
                    Section 8
                  </span>
                </div>
                <Link
                  href="/properties"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[--primary] text-[--background] rounded-xl font-bold hover:bg-[--primary-light] transition-all w-fit"
                >
                  <span>Browse Properties</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full h-64 md:h-full min-h-[300px] bg-gradient-to-br from-[--primary]/20 to-[--primary]/5 rounded-2xl flex items-center justify-center border border-[--primary]/20">
                  <Building2 className="w-24 h-24 text-[--primary]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid - White Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center"
          >
            Investment <span className="text-amber-600">Resources</span>
          </motion.h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Expert insights on Detroit rental properties, Michigan real estate, and opportunities for Canadian investors
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, index) => {
              const Icon = article.icon;
              return (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:border-amber-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-${article.color}-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${article.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="inline-flex items-center space-x-2 text-amber-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Topics - White Section */}
      <section className="bg-slate-50 py-16 px-4 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Popular Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Detroit Rental Properties',
              'Michigan Real Estate',
              'Section 8 Tenants',
              'Canadian Investors',
              'Turnkey Properties',
              'Cash Flow Analysis',
              'ROI Calculations',
              'Property Management',
            ].map((topic) => (
              <Link
                key={topic}
                href="/properties"
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-center text-slate-700 font-medium hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 transition-all text-sm"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark */}
      <section className="bg-[--background] py-16 px-4 relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/2 -right-20 w-96 h-96 bg-[--primary]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Investing in <span className="text-[--primary]">Detroit?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Browse our selection of turnkey Detroit rental properties with Section 8 tenants. Perfect for Canadian investors seeking guaranteed cash flow.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[--primary] text-[--background] rounded-xl font-bold hover:bg-[--primary-light] transition-all text-lg"
            >
              <span>View Available Properties</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
