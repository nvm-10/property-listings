'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Calendar, Video, Mail, User } from 'lucide-react';
import { useProperties } from '@/contexts/PropertyContext';

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

type ContactType = 'call' | 'visit' | 'video';

export default function ContactModal({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
  contact,
}: ContactModalProps) {
  const { updatePropertyStatus } = useProperties();
  const [selectedType, setSelectedType] = useState<ContactType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log('Contact form submitted:', {
      ...formData,
      contactType: selectedType,
      propertyTitle,
    });

    // Mark property as Pending when visit is scheduled
    if (selectedType === 'visit') {
      updatePropertyStatus(propertyId, 'Pending');
    }

    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedType(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredDate: '',
        preferredTime: '',
      });
      onClose();
    }, 3000);
  };

  const handleDirectCall = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  const handleDirectEmail = () => {
    window.location.href = `mailto:${contact.email}?subject=Inquiry about ${propertyTitle}`;
  };

  const contactOptions = [
    {
      type: 'call' as ContactType,
      icon: Phone,
      title: 'Phone Call',
      description: 'Schedule a phone consultation',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      type: 'visit' as ContactType,
      icon: Calendar,
      title: 'Property Visit',
      description: 'Schedule an in-person tour',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      type: 'video' as ContactType,
      icon: Video,
      title: 'Video Call',
      description: 'Virtual property walkthrough',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-[--primary] to-[--accent]">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Contact Agent
                </h2>
                <p className="text-white/90 text-sm line-clamp-1">
                  {propertyTitle}
                </p>
              </div>

              <div className="p-6">
                {!isSubmitted ? (
                  <>
                    {!selectedType ? (
                      /* Contact Type Selection */
                      <div className="space-y-6">
                        {/* Agent Info */}
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-12 h-12 bg-gradient-to-br from-[--primary] to-[--accent] rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {contact.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Licensed Real Estate Agent
                            </p>
                          </div>
                        </div>

                        {/* Quick Contact Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={handleDirectCall}
                            className="flex items-center justify-center space-x-2 p-4 border-2 border-blue-200 hover:border-blue-400 rounded-xl transition-all group"
                          >
                            <Phone className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-gray-700">
                              Call Now
                            </span>
                          </button>
                          <button
                            onClick={handleDirectEmail}
                            className="flex items-center justify-center space-x-2 p-4 border-2 border-purple-200 hover:border-purple-400 rounded-xl transition-all group"
                          >
                            <Mail className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-gray-700">
                              Send Email
                            </span>
                          </button>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">
                              Or schedule an appointment
                            </span>
                          </div>
                        </div>

                        {/* Contact Options */}
                        <div className="space-y-3">
                          {contactOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                              <button
                                key={option.type}
                                onClick={() => setSelectedType(option.type)}
                                className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 hover:border-transparent hover:shadow-lg rounded-xl transition-all group"
                              >
                                <div
                                  className={`w-12 h-12 bg-gradient-to-br ${option.gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}
                                >
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 text-left">
                                  <h3 className="font-bold text-gray-900 group-hover:text-[--primary] transition-colors">
                                    {option.title}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {option.description}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Contact Form */
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <button
                          type="button"
                          onClick={() => setSelectedType(null)}
                          className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                        >
                          <span>←</span>
                          <span>Back</span>
                        </button>

                        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                          <p className="text-sm font-medium text-gray-700">
                            Booking:{' '}
                            <span className="text-[--primary]">
                              {
                                contactOptions.find(
                                  (o) => o.type === selectedType
                                )?.title
                              }
                            </span>
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                            placeholder="(123) 456-7890"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Preferred Date *
                            </label>
                            <input
                              type="date"
                              required
                              value={formData.preferredDate}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  preferredDate: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Preferred Time *
                            </label>
                            <input
                              type="time"
                              required
                              value={formData.preferredTime}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  preferredTime: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message (Optional)
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                            placeholder="Any specific questions or requirements?"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-[--primary] to-[--accent] text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                        >
                          Submit Request
                        </button>
                      </form>
                    )}
                  </>
                ) : (
                  /* Success Message */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Request Submitted!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {contact.name} will contact you shortly to confirm your
                      appointment.
                    </p>
                    <p className="text-sm text-gray-500">
                      Check your email for confirmation details.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
