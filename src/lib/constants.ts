// UI Constants
export const UI_CONSTANTS = {
  POPUP_DELAY_MS: 3000,
  AUTO_CLOSE_DELAY_MS: 3000,
  FOCUS_DELAY_MS: 50,
  SCROLL_BEHAVIOR: 'smooth' as const,
  MAX_EMAIL_LENGTH: 100,
} as const;

// Color Gradients
export const GRADIENTS = {
  RED_ORANGE: 'from-red-600 via-orange-500 to-yellow-500',
  BG_LIGHT: 'from-white via-gray-50 to-white',
  BG_DARK: 'from-gray-900 via-red-900 to-black',
  RED_ORANGE_YELLOW: 'from-red-600 via-orange-600 to-yellow-500',
  YELLOW_ORANGE: 'from-yellow-400 to-orange-500',
} as const;

// Typography
export const TYPOGRAPHY = {
  TITLE_SIZE: '45px',
  SUBTITLE_SIZE: '15px',
  HEADING_XL: 'text-5xl md:text-7xl',
  HEADING_LG: 'text-4xl md:text-5xl',
  HEADING_MD: 'text-3xl md:text-4xl',
} as const;

// Business Info
export const BUSINESS_INFO = {
  NAME: 'Pollo Feliz',
  TAGLINE: 'El Mejor Pollo Asado de Durango',
  PHONE: '6181293730',
  PHONE_FORMATTED: '(618) 129-3730',
  EMAIL_SUPPORT: 'soporte@pollofelizdgo.com',
  EMAIL_BILLING: 'facturacion@pollofelizdgo.com',
  WHATSAPP: '5216181293730',
  YEARS_IN_BUSINESS: 22,
  BRANCH_COUNT: 7,
  HOURS: 'Lun-Dom 12:00 pm - 6:30 pm',
  CITY: 'Durango, Dgo.',
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://www.instagram.com/pollofeliz.durango?igsh=OHZic3g2dWU1am9t',
  FACEBOOK: 'https://www.facebook.com/share/14S6JKVRsoe/',
  TIKTOK: 'https://www.tiktok.com/@pollofelizdgo',
  WHATSAPP: 'https://wa.me/5216181293730',
} as const;

// External Links
export const EXTERNAL_LINKS = {
  BILLING_PORTAL: 'https://facturacion.galasistemas.com/',
  SURVEY_FORM: 'https://opnform.com/forms/encuesta-de-quejas-y-satisfaccion-del-cliente-tx8a2h',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  PROMO_POPUP_SEEN: 'promo-popup-seen',
  PROMO_SUBSCRIBED: 'promo-subscribed',
  USER_PREFERENCES: 'user-preferences',
} as const;

// Navigation
export const NAV_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/menu', label: 'Menú' },
  { href: '/sucursales', label: 'Sucursales' },
  { href: '/about', label: 'Acerca' },
  { href: '/contact', label: 'Contacto' },
] as const;

// Map Settings
export const MAP_SETTINGS = {
  DEFAULT_LAT: 24.0402437,
  DEFAULT_LNG: -104.6314165,
  DEFAULT_ZOOM: 13,
} as const;

// Form Validation
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 500,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  REVIEWS: '/api/reviews',
  ORDERS: '/api/orders',
  IMAGES: '/api/images',
} as const;
