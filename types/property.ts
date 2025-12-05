export interface Property {
  id: string;
  title: string;
  type: 'Single Family' | 'Duplex' | 'Multi-Family' | 'Apartment' | 'Commercial';
  price: number;
  roi: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms?: number;
    bathrooms?: number;
    sqft: number;
    units?: number;
    yearBuilt?: number;
    parking?: number;
  };
  description: string;
  images: string[];
  status: 'Available' | 'Pending' | 'Sold';
  cashFlow: number;
  tenantOccupied: boolean;
  highlights: string[];
  createdAt: string;
  closedAt?: string;
  featured: boolean;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface PropertyFilters {
  type?: Property['type'];
  minPrice?: number;
  maxPrice?: number;
  minROI?: number;
  status?: Property['status'];
  city?: string;
}
