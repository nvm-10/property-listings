'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, MessageCircle, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function ContactModal({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
  contact,
}: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', {
      ...formData,
      propertyTitle,
    });

    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      onClose();
    }, 3000);
  };

  const handleWhatsApp = () => {
    const cleanPhone = contact.phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Hi, I'm interested in the property: ${propertyTitle}`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleDirectEmail = () => {
    window.location.href = `mailto:${contact.email}?subject=Inquiry about ${propertyTitle}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1f2e] rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-700 my-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Animated Header */}
              <div className="relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/20 rounded-full"
                      style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                <div className="relative p-6 text-white">
                  {/* Close button */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center"
                  >
                    {/* Animated Icon */}
                    <motion.div
                      variants={itemVariants}
                      className="relative mb-3"
                    >
                      <motion.div
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(255,255,255,0.2)',
                            '0 0 40px rgba(255,255,255,0.3)',
                            '0 0 20px rgba(255,255,255,0.2)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MessageCircle className="w-8 h-8" />
                      </motion.div>
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                      </motion.div>
                    </motion.div>

                    <motion.h2
                      variants={itemVariants}
                      className="text-2xl font-bold text-center mb-1"
                    >
                      Contact Agent
                    </motion.h2>
                    <motion.p
                      variants={itemVariants}
                      className="text-center text-green-100/90 text-sm line-clamp-1 max-w-xs"
                    >
                      {propertyTitle}
                    </motion.p>
                  </motion.div>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-6"
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Agent Info */}
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-center space-x-4 p-4 bg-[#252b3b] rounded-xl border border-gray-700"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Licensed Real Estate Agent
                        </p>
                      </div>
                    </motion.div>

                    {/* Quick Contact Buttons */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                      <motion.button
                        type="button"
                        onClick={handleWhatsApp}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center space-x-2 p-4 bg-green-500/10 border border-green-500/30 hover:border-green-500/50 hover:bg-green-500/20 rounded-xl transition-all group"
                      >
                        <MessageCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-green-400">
                          WhatsApp
                        </span>
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={handleDirectEmail}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center space-x-2 p-4 bg-purple-500/10 border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/20 rounded-xl transition-all group"
                      >
                        <Mail className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-purple-400">
                          Send Email
                        </span>
                      </motion.button>
                    </motion.div>

                    {/* Divider */}
                    <motion.div variants={itemVariants} className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-4 text-sm text-gray-400 bg-[#1a1f2e]">
                          Or send a message
                        </span>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-[#252b3b] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-[#252b3b] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#252b3b] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                        placeholder="(123) 456-7890"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-3 bg-[#252b3b] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                        placeholder="Any specific questions or requirements?"
                      />
                    </motion.div>

                    <motion.button
                      variants={itemVariants}
                      type="submit"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group w-full relative overflow-hidden rounded-2xl transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl" />
                      <div className="relative flex items-center justify-center space-x-2 px-6 py-4">
                        <Send className="w-5 h-5 text-white" />
                        <span className="text-white font-semibold">Send Message</span>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </form>
                ) : (
                  /* Success Message */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(34, 197, 94, 0.3)',
                          '0 0 40px rgba(34, 197, 94, 0.5)',
                          '0 0 20px rgba(34, 197, 94, 0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {contact.name} will contact you shortly.
                    </p>
                    <p className="text-sm text-gray-500">
                      Check your email for confirmation details.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
}
