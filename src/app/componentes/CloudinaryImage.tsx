"use client";
import { CldImage, CldImageProps } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
}

/**
 * Componente mejorado para imágenes optimizadas de Cloudinary
 * - Blur placeholder automático mientras carga
 * - Lazy loading por defecto
 * - Manejo de errores con UI de fallback
 * - Transiciones suaves
 * 
 * Uso: <CloudinaryImage src="pollo-feliz/platillos/combinacion" alt="Pollo asado" width={800} height={600} />
 */
export default function CloudinaryImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  priority = false,
  loading = "lazy",
  placeholder = "blur",
  ...props
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Blur placeholder mientras carga */}
      {isLoading && placeholder === "blur" && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-lg" />
      )}
      
      {/* Imagen de error */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Imagen no disponible</p>
          </div>
        </div>
      )}
      
      {/* Imagen principal */}
      {!hasError && (
        <CldImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          priority={priority}
          crop="fill"
          gravity="auto"
          quality="auto"
          format="auto"
          loading={priority ? "eager" : loading}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...props}
        />
      )}
    </div>
  );
}
