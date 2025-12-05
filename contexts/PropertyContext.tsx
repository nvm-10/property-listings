'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Property } from '@/types/property';
import { properties as initialProperties } from '@/data/properties';

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Property) => void;
  updatePropertyStatus: (propertyId: string, status: Property['status']) => void;
  getAvailableProperties: () => Property[];
  getClosedProperties: () => Property[];
  getPropertyById: (id: string) => Property | undefined;
  deleteProperty: (propertyId: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);

  // Load properties from localStorage on mount, or use initial data
  useEffect(() => {
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
      try {
        setProperties(JSON.parse(storedProperties));
      } catch (error) {
        console.error('Failed to parse stored properties:', error);
        setProperties(initialProperties);
      }
    } else {
      setProperties(initialProperties);
    }
  }, []);

  // Save to localStorage whenever properties change
  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem('properties', JSON.stringify(properties));
    }
  }, [properties]);

  const addProperty = (property: Property) => {
    setProperties((prev) => [...prev, property]);
  };

  const updatePropertyStatus = (propertyId: string, status: Property['status']) => {
    setProperties((prev) =>
      prev.map((prop) => {
        if (prop.id === propertyId) {
          const updates: Partial<Property> = { status };
          // Set closedAt timestamp when property becomes Sold or Pending
          if ((status === 'Sold' || status === 'Pending') && !prop.closedAt) {
            updates.closedAt = new Date().toISOString();
          }
          return { ...prop, ...updates };
        }
        return prop;
      })
    );
  };

  const getAvailableProperties = () => {
    return properties.filter((prop) => prop.status === 'Available');
  };

  const getClosedProperties = () => {
    return properties
      .filter((prop) => prop.status === 'Sold' || prop.status === 'Pending')
      .sort((a, b) => {
        const dateA = a.closedAt ? new Date(a.closedAt).getTime() : new Date(a.createdAt).getTime();
        const dateB = b.closedAt ? new Date(b.closedAt).getTime() : new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
  };

  const getPropertyById = (id: string) => {
    return properties.find((prop) => prop.id === id);
  };

  const deleteProperty = (propertyId: string) => {
    setProperties((prev) => prev.filter((prop) => prop.id !== propertyId));
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        updatePropertyStatus,
        getAvailableProperties,
        getClosedProperties,
        getPropertyById,
        deleteProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
