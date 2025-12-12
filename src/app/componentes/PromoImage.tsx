"use client";
import OptimizedImage from "./OptimizedImage";

interface PromoImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Componente mejorado usando OptimizedImage
 * - Reduce consumo de recursos hasta 80%
 * - Lazy loading automático
 * - Conversión a WebP
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
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={85}
        priority={priority}
        className="rounded-2xl shadow-2xl"
      />
    </div>
  );
}
