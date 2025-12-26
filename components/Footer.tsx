'use client';

import Link from 'next/link';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[--background] via-blue-950/50 to-purple-950/50 border-t border-[--border] overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwxMzAsMjQ2LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[--primary] to-[--accent] rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                PropertyHub
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for turnkey real estate investments with guaranteed positive cash flow and high ROI.
            </p>
            <a
              href="tel:1-866-964-6088"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[--primary] to-[--accent] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/closed-deals" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Closed Deals
                </Link>
              </li>
              <li>
                <Link href="/role-selection" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Why Invest */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Why Invest</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span>Positive Cash Flow</span>
              </li>
              <li className="text-gray-400 text-sm flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span>High ROI Properties</span>
              </li>
              <li className="text-gray-400 text-sm flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span>Tenant Occupied</span>
              </li>
              <li className="text-gray-400 text-sm flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span>Turnkey Properties</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:1-866-964-6088" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                  <Phone className="w-4 h-4 text-[--primary-light]" />
                  <span>1-866-964-6088</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@propertyhub.com" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                  <Mail className="w-4 h-4 text-[--primary-light]" />
                  <span>info@propertyhub.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-[--primary-light] mt-1 flex-shrink-0" />
                  <span>123 Investment Blvd<br />Suite 100<br />Real Estate City, RE 12345</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[--border-light]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} PropertyHub. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Investment properties with verified cash flow and ROI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
