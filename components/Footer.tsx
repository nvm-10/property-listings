'use client';

import Link from 'next/link';
import { Building2, MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[--background-secondary] border-t border-[--border] overflow-hidden">

      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-10 h-10 bg-[--primary] rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
                <Building2 className="w-6 h-6 text-[--background]" />
              </div>
              <span className="text-2xl font-bold text-white">
                Property<span className="text-[--primary]">Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for turnkey real estate investments with guaranteed positive cash flow and high ROI.
            </p>
            <a
              href="https://wa.me/18669646088?text=Hi%2C%20I%27m%20interested%20in%20your%20properties"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[--primary] hover:bg-[--primary-light] text-[--background] rounded-lg font-medium text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Us</span>
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
                <span className="w-1.5 h-1.5 bg-[--primary] rounded-full"></span>
                <span>Positive Cash Flow</span>
              </li>
              <li className="text-gray-400 text-sm flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[--primary] rounded-full"></span>
                <span>High ROI Properties</span>
              </li>
              <li className="text-gray-400 text-sm flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[--primary] rounded-full"></span>
                <span>Tenant Occupied</span>
              </li>
              <li className="text-gray-400 text-sm flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[--primary] rounded-full"></span>
                <span>Turnkey Properties</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/18669646088?text=Hi%2C%20I%27m%20interested%20in%20your%20properties" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-[--primary] transition-colors text-sm">
                  <MessageCircle className="w-4 h-4 text-[--primary]" />
                  <span>WhatsApp Us</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@propertyhub.com" className="flex items-center space-x-2 text-gray-400 hover:text-[--primary] transition-colors text-sm">
                  <Mail className="w-4 h-4 text-[--primary]" />
                  <span>info@propertyhub.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-[--primary] mt-1 flex-shrink-0" />
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
