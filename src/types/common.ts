// Common Types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type?: 'general' | 'promo' | 'complaint' | 'suggestion';
}

export interface ContactTicket extends BaseEntity {
  ticket: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: string;
  status: 'pending' | 'resolved' | 'closed';
}

// Review Types
export interface ReviewData {
  sucursal: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Review extends BaseEntity {
  sucursalId: string;
  userName: string;
  rating: number;
  comment: string;
  verified: boolean;
}

// Sucursal Types
export interface Sucursal {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  extension?: string;
  hours: string;
  image?: string;
  features?: string[];
}

export interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  address: string;
  hours: string;
  phone: string;
  extension?: string;
}

// Menu Types
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: 'combos' | 'platillos' | 'bebidas' | 'extras';
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

// Order Types
export interface OrderItem {
  menuItemId: string;
  quantity: number;
  specialInstructions?: string;
}

export interface Order extends BaseEntity {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: OrderItem[];
  sucursalId: string;
  deliveryAddress?: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
}

// Component Props Types
export interface LogoProps {
  imgClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

// Form State Types
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

// Storage Types
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'es' | 'en';
  notifications: boolean;
}
