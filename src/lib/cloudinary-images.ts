/**
 * Sistema centralizado de gestión de imágenes en Cloudinary
 * 
 * CÓMO USAR:
 * 1. Para cambiar una imagen: actualiza solo el nombre del archivo en este archivo
 * 2. Para agregar nueva imagen: agrégala aquí y úsala con getCloudinaryImage()
 * 3. Todas las transformaciones y optimizaciones se aplican automáticamente
 */

// Configuración base
export const CLOUDINARY_CONFIG = {
  cloudName: 'dw55kbkmn',
  baseFolder: 'pollo-feliz',
} as const;

/**
 * Catálogo de imágenes organizadas por categoría
 * Para cambiar una imagen, solo modifica el valor del string
 * NOTA: Estos paths son relativos dentro de pollo-feliz/
 */
export const IMAGES = {
  // Menú - Imágenes para el menú de productos
  menu: {
    combinacion: 'pollo-feliz/menu/combinacion',
    combinacion_nov25: 'pollo-feliz/menu/combinacion_nov25',
    perfil: 'pollo-feliz/menu/perfil',
    perfil_nov25: 'pollo-feliz/menu/perfil_nov25',
    equipo: 'pollo-feliz/menu/equipo',
  },
  
  // Platos - Combinaciones (carpeta original)
  platillos: {
    combinacion: 'pollo-feliz/platillos/combinacion',
    perfil: 'pollo-feliz/platillos/perfil',
    equipo: 'pollo-feliz/platillos/equipo',
    cadera: 'pollo-feliz/platillos/cadera',
    pierna: 'pollo-feliz/platillos/pierna',
    pechuga: 'pollo-feliz/platillos/pechuga',
    medio: 'pollo-feliz/platillos/medio',
    entero: 'pollo-feliz/platillos/entero',
    alas: 'pollo-feliz/platillos/alas',
  },
  
  // Productos individuales
  productos: {
    nuggets: 'pollo-feliz/nuggets',
    hamburguesa: 'pollo-feliz/hamburguesa',
    papas: 'pollo-feliz/papas',
    refresco: 'pollo-feliz/refresco',
    salsa: 'pollo-feliz/salsa',
  },
  
  // Slider del home
  slider: {
    combinacion: 'pollo-feliz/slider/combinacion_slider',
    perfil: 'pollo-feliz/slider/perfil_slider',
    equipo: 'pollo-feliz/slider/equipo_slider',
    cadera: 'pollo-feliz/slider/cadera_slider',
    pierna: 'pollo-feliz/slider/pierna_slider',
    pechuga: 'pollo-feliz/slider/pechuga_slider',
    medio: 'pollo-feliz/slider/medio_slider',
    entero: 'pollo-feliz/slider/entero_slider',
    alas: 'pollo-feliz/slider/alas_slider',
  },
  
  // Otros
  otros: {
    qrEncuesta: 'pollo-feliz/qr-encuesta',
  },
} as const;

/**
 * Retorna el path de la imagen para usar en CldImage
 * @param imagePath - Path completo de la imagen desde IMAGES
 * @returns Path para usar en CldImage src
 */
export function getCloudinaryImage(imagePath: string): string {
  return imagePath;
}

/**
 * Configuraciones predefinidas para diferentes tipos de imágenes
 */
export const IMAGE_PRESETS = {
  // Para cards de menú
  menuCard: {
    width: 400,
    height: 300,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },
  
  // Para slider/carousel
  slider: {
    width: 800,
    height: 600,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },
  
  // Para hero images
  hero: {
    width: 1200,
    height: 600,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },
  
  // Para thumbnails
  thumbnail: {
    width: 200,
    height: 150,
    crop: 'thumb' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },
} as const;

/**
 * Helper para obtener URL directa de Cloudinary (para debugging)
 */
export function getCloudinaryUrl(imagePath: string, width = 800): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/w_${width},f_auto,q_auto/${imagePath}`;
}
