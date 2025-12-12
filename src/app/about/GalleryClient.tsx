"use client";

import React, { useState, useEffect, useCallback } from "react";

export type Photo = {
  file: string;
  title?: string;
  caption?: string;
};

export default function GalleryClient({ photos }: { photos: Photo[] }) {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleImageLoad = (file: string) => {
    setLoaded((s) => ({ ...s, [file]: true }));
  };

  const openAt = (index: number) => setSelectedIndex(index);
  const close = () => setSelectedIndex(null);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [selectedIndex, photos.length]);

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [selectedIndex, photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, showPrev, showNext]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {photos.map(({ file, title, caption }, idx) => {
          const key = file;
          const isLoaded = !!loaded[key];
          return (
            <figure key={key} className="overflow-hidden rounded-lg shadow bg-white">
              {/* Thumbnail: click to open lightbox */}
              <button
                type="button"
                onClick={() => openAt(idx)}
                className="relative w-full h-48 md:h-56 bg-gray-100 block focus:outline-none"
                aria-label={`Abrir ${title || file}`}
              >
                <img
                  src={`/imagenes/${encodeURIComponent(file)}`}
                  alt={title || `Pollo Feliz - ${file.replace(/\.[^.]+$/, "")}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(key)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
                    isLoaded ? "opacity-100 filter-none" : "opacity-0"
                  }`}
                />

                <div
                  aria-hidden
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                    isLoaded ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    backgroundImage: `url('/imagenes/${encodeURIComponent(file)}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(8px) scale(1.02)",
                  }}
                />
              </button>

              <figcaption className="p-2 text-sm text-gray-800">
                <div className="font-medium">{title}</div>
                <div className="text-xs text-gray-600">{caption}</div>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Lightbox / modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/imagenes/${encodeURIComponent(photos[selectedIndex].file)}`}
              alt={photos[selectedIndex].title || photos[selectedIndex].file}
              className="max-w-full max-h-[80vh] object-contain rounded"
            />

            <button
              onClick={close}
              className="absolute top-2 right-2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Prev / Next */}
            <button
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50"
              aria-label="Anterior"
            >
              ‹
            </button>

            <button
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50"
              aria-label="Siguiente"
            >
              ›
            </button>

            <div className="mt-2 text-center text-sm text-white">
              <div className="font-medium">{photos[selectedIndex].title}</div>
              <div className="text-xs text-white/80">{photos[selectedIndex].caption}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
