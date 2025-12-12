"use client";
import CloudinaryImage from "./CloudinaryImage";

interface PromoImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Componente optimizado con Cloudinary
 * - Imágenes desde CDN global
 * - Conversión automática a WebP
 * - Lazy loading y optimización
 */
export default function PromoImage({ 
  src, 
  alt, 
  fallbackSrc, 
  width = 1200, 
  height = 800,
  priority = false 
}: PromoImageProps) {
  return (
    <div className="relative w-full h-full hover:scale-105 transition-transform duration-300">
      <CloudinaryImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="rounded-2xl shadow-2xl"
      />
    </div>
  );
}
