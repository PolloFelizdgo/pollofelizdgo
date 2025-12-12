// Shared types for the Pollo Feliz application

export interface Sucursal {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  extension?: string;
  hours?: string;
  image?: string;
  mapZoom?: number;
}

export interface Plato {
  name: string;
  desc?: string;
  price?: number;
  category?: string;
  image?: string;
  bestseller?: boolean;
}

export interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  address: string;
  hours?: string;
  phone?: string;
  extension?: string;
  image?: string;
}

export interface ImageData {
  default?: string;
  srcSet?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  ticket?: string;
  type?: string;
}
