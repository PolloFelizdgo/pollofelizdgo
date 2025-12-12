"use client";
import { useEffect, useRef, useState } from "react";

interface OptimizedVideoProps {
  srcBase: string;
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  preloadDistance?: string;
}

/**
 * Componente de video optimizado con lazy loading
 * - Solo carga el video cuando está cerca del viewport
 * - Soporta múltiples formatos (WebM, MP4)
 * - Poster image optimizada
 * - Preload controlado
 */
export default function OptimizedVideo({
  srcBase,
  poster,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = true,
  className = "w-full rounded-md",
  preloadDistance = "200px",
}: OptimizedVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsInView(true);
            setHasLoaded(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: preloadDistance,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [preloadDistance, hasLoaded]);

  // Auto-play cuando esté en vista (si está configurado)
  useEffect(() => {
    if (isInView && autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignorar errores de autoplay (necesita interacción del usuario)
      });
    }
  }, [isInView, autoPlay]);

  return (
    <div ref={containerRef} className={`video-container ${className}`}>
      {!isInView ? (
        // Placeholder mientras no está en vista
        <div 
          className="w-full aspect-video bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center rounded-md"
          style={{ 
            backgroundImage: poster ? `url(${poster})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-auto aspect-video bg-black rounded-md"
          poster={poster}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          preload="metadata"
          aria-label="Video"
        >
          <source src={`/videos/${srcBase}.webm`} type="video/webm" />
          <source src={`/videos/${srcBase}.mp4`} type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      )}
    </div>
  );
}
