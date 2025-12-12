"use client";
import { CldImage } from 'next-cloudinary';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

/**
 * Componente para imágenes optimizadas de Cloudinary
 * Uso: <CloudinaryImage src="pollo_asado" alt="Pollo asado" width={800} height={600} />
 */
export default function CloudinaryImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  priority = false
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      crop="fill"
      gravity="auto"
      quality="auto"
      format="auto"
    />
  );
}
