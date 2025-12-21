'use client';

import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

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
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 bg-[--background-tertiary] border border-[--border-light] rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[--primary] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-[--background-tertiary] border border-[--border-light] rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[--primary] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-[--background-tertiary] border border-[--border-light] rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[--primary] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-[--background-tertiary] border border-[--border-light] rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[--primary] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
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

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Investment Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
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
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
