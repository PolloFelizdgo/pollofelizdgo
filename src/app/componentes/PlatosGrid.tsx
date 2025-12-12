"use client";
import React, { useState, useEffect } from "react";
import { PLATOS } from "../data/platos";

// PlatosGrid: muestra una cuadrícula de platillos usando imágenes en public/imagenes
// Instrucciones:
// - Coloca tus imágenes en `public/imagenes/` con los nombres indicados en cada objeto.
// - Para activar el precio visible, rellena `price` con un número (ej. 129.00).
// - Puedes añadir `srcSet` o variantes si subes imágenes en diferentes resoluciones.

export default function PlatosGrid() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [imagesMap, setImagesMap] = useState<Record<string, { default?: string; srcSet?: string }>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImage(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const cached = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('imagenesMap') : null;
        if (cached) {
          setImagesMap(JSON.parse(cached));
          return;
        }
        const res = await fetch('/api/images');
        if (!res.ok) return;
        const data = await res.json();
        setImagesMap(data || {});
        try { if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('imagenesMap', JSON.stringify(data || {})); } catch (e) { /* ignore storage errors */ }
      } catch (err) {
        // ignore
      }
    };
    load();
  }, []);

  return (
    <section aria-labelledby="platos-title" className="w-full px-4 md:px-8 py-8 bg-white">
      {/* Sección: Nuestros Platos - aquí puedes editar/añadir platillos */}
      <h2 id="platos-title" className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800">Nuestros Platos</h2>

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {PLATOS.map((p, index) => {
          const meta = imagesMap[p.imageBase] || {};
          const src = meta.default ?? `/imagenes/platillos/${p.imageBase}.jpg`;

          return (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              onClick={() => {
                setModalImage(src);
                setModalTitle(p.name);
              }}
            >
              <div className="overflow-visible p-0 relative">
                {loadingImages[p.imageBase] !== false && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-t-lg" />
                )}
                <img
                  alt={p.name}
                  className="w-full object-cover h-[140px] rounded-t-lg"
                  src={src}
                  loading="lazy"
                  onLoad={() => setLoadingImages(prev => ({ ...prev, [p.imageBase]: false }))}
                  onError={(e) => {
                    e.currentTarget.src = `/imagenes/platillos/placeholder.jpg`;
                    setLoadingImages(prev => ({ ...prev, [p.imageBase]: false }));
                  }}
                />
              </div>
              <div className="p-3 flex justify-between items-center text-sm">
                <b className="text-gray-800">{p.name}</b>
                <p className="text-gray-500">{p.price != null ? `$${p.price.toFixed(2)}` : "--"}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para ver la imagen ampliada */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="max-w-4xl w-full bg-white rounded-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-medium">{modalTitle}</h3>
              <button className="text-slate-600" onClick={() => setModalImage(null)} aria-label="Cerrar">
                ✕
              </button>
            </div>
            <div className="w-full h-[60vh] md:h-[70vh] bg-white">
              {/* Modal background changed to white so images display on a clean surface */}
              <img src={modalImage} alt={modalTitle || "imagen"} className="w-full h-full object-contain bg-transparent" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
