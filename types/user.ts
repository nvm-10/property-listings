export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  createdAt: string;
}

export interface SavedProperty {
  userId: string;
  propertyId: string;
  savedAt: string;
}
