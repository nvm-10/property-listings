'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Building2, Mail, MessageCircle, User, LogOut, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import AuthModal from './AuthModal';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/properties', label: 'Properties', icon: Building2 },
    { href: '/closed-deals', label: 'Closed Deals', icon: FileCheck },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[--background]/95 backdrop-blur-md shadow-lg border-b border-[--border]'
          : 'bg-[--background]/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-[--primary] rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
              <Building2 className="w-6 h-6 text-[--background]" />
            </div>
            <span className="text-2xl font-bold text-white hidden sm:block">
              Property<span className="text-[--primary]">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/18669646088?text=Hi%2C%20I%27m%20interested%20in%20your%20properties"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-green-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            
            {status === 'authenticated' && session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-[--background-tertiary] rounded-full transition-colors"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-[--primary] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-[--background]" />
                    </div>
                  )}
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-[--background-secondary] border border-[--border-light] rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-4 bg-[--background-tertiary] border-b border-[--border-light]">
                        <p className="font-bold text-white">{session.user.name}</p>
                        <p className="text-sm text-gray-400">{session.user.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-[--primary]/10 border border-[--primary]/30 rounded-full text-xs font-medium text-[--primary] capitalize">
                          {session.user.role}
                        </span>
                      </div>
                      <div className="p-2">
                        <Link
                          href={`/dashboard/${session.user.role}`}
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center space-x-2 px-4 py-3 hover:bg-[--background-tertiary] rounded-xl transition-colors"
                        >
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300 font-medium">Dashboard</span>
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-red-500/10 rounded-xl transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 font-medium">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-2.5 bg-[--primary] text-[--background] rounded-lg font-semibold text-sm hover:bg-[--primary-light] transition-all duration-200"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-[--background-tertiary] transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[--background-secondary] border-t border-[--border]"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              {status === 'authenticated' && session?.user ? (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block w-full px-6 py-3 bg-red-500/90 text-white rounded-lg font-medium text-center hover:bg-red-600 transition-all"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="block w-full px-6 py-3 bg-[--primary] text-[--background] rounded-lg font-semibold text-center hover:bg-[--primary-light] transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </motion.nav>
  );
}
