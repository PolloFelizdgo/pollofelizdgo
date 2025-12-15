/**
 * Hook personalizado para precargar recursos críticos
 * Mejora el rendimiento precargando imágenes y recursos antes de que se necesiten
 */

import { useEffect } from 'react';

interface PreloadOptions {
  images?: string[];
  fonts?: string[];
  scripts?: string[];
}

export function usePreload({ images = [], fonts = [], scripts = [] }: PreloadOptions) {
  useEffect(() => {
    // Preload images
    images.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload fonts
    fonts.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = src;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload scripts
    scripts.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [images, fonts, scripts]);
}

/**
 * Hook para prefetch de páginas
 * Útil para precargar rutas que el usuario probablemente visitará
 */
export function usePrefetchPages(pages: string[]) {
  useEffect(() => {
    pages.forEach((page) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }, [pages]);
}

/**
 * Hook para detectar conexión lenta y ajustar calidad
 */
export function useConnectionSpeed() {
  if (typeof window === 'undefined') return 'fast';
  
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) return 'fast';
  
  const effectiveType = connection.effectiveType;
  
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'slow';
  } else if (effectiveType === '3g') {
    return 'medium';
  }
  
  return 'fast';
}
