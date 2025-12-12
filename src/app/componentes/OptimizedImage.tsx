"use client";
import { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Componente de imagen optimizado que usa la API de optimización
 * - Lazy loading automático con IntersectionObserver
 * - Skeleton loader mientras carga
 * - Soporte para diferentes tamaños y calidades
 * - Formato WebP automático con fallback
 */
export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height,
  quality = 80,
  className = "",
  priority = false,
  sizes = "100vw",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(priority);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generar URL optimizada
  const getOptimizedUrl = (w: number, format: string = "webp") => {
    // Si es una URL externa, devolverla tal cual
    if (src.startsWith("http")) return src;
    
    return `/api/optimize-image?path=${encodeURIComponent(src)}&w=${w}&q=${quality}&f=${format}`;
  };

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Cargar antes de que sea visible
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Cargar imagen cuando esté en vista
  useEffect(() => {
    if (!isInView) return;

    const webpUrl = getOptimizedUrl(width, "webp");
    const jpegUrl = getOptimizedUrl(width, "jpeg");

    // Precargar imagen
    const img = new Image();
    img.src = webpUrl;
    
    img.onload = () => {
      setImgSrc(webpUrl);
      setIsLoading(false);
    };

    img.onerror = () => {
      // Fallback a JPEG si WebP falla
      setImgSrc(jpegUrl);
      setIsLoading(false);
    };
  }, [isInView, src, width, quality]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: height ? `${width}/${height}` : undefined }}>
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Imagen optimizada */}
      <img
        ref={imgRef}
        src={imgSrc || undefined}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={width}
        height={height}
        sizes={sizes}
      />
    </div>
  );
}
