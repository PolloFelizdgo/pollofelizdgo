"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { PLATOS } from "../data/platos";
import Image from "next/image";
import { CLOUDINARY_CONFIG } from "@/lib/cloudinary-images";

// PlatosGrid: muestra una cuadrícula de platillos usando imágenes de Cloudinary
// Optimizado con React.memo y lazy loading

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number | null;
  cloudinaryPath: string;
  category: string;
  available: boolean;
  bestseller?: boolean;
};

function PlatosGrid() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [products] = useState<Product[]>(() =>
    PLATOS.map((p, idx) => ({
      id: p.name || `plato-${idx}`,
      name: p.name,
      description: p.desc,
      price: p.price ?? null,
      cloudinaryPath: p.imageBase,
      category: p.category || 'Otros',
      available: true,
      bestseller: p.bestseller,
    }))
  );

  const closeModal = useCallback(() => {
    setModalImage(null);
    setModalTitle(null);
  }, []);

  const openModal = useCallback((imageBase: string, title: string) => {
    setModalImage(imageBase);
    setModalTitle(title);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeModal]);

  // Mostrar solo los primeros 8 platos para mejorar rendimiento inicial
  const visiblePlatos = useMemo(() => products.slice(0, 8), [products]);

  const buildImageUrl = useCallback((path: string) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('/')) return path;
    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/c_fill,g_auto,w_400,h_300,f_auto,q_auto/${path}`;
  }, []);

  if (visiblePlatos.length === 0) {
    return (
      <section className="w-full px-4 md:px-8 py-8 bg-white">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800">Nuestros Platos</h2>
        <p className="text-gray-500 text-center py-8">No hay platillos disponibles en este momento.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="platos-title" className="w-full px-4 md:px-8 py-8 bg-white">
      {/* Sección: Nuestros Platos - aquí puedes editar/añadir platillos */}
      <h2 id="platos-title" className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800">Nuestros Platos</h2>

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {visiblePlatos.map((p, index) => {
          return (
            <div 
              key={`${p.id}-${index}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              onClick={() => openModal(p.cloudinaryPath, p.name)}
            >
              <div className="overflow-hidden relative h-35 w-full">
                <Image
                  src={buildImageUrl(p.cloudinaryPath)}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover rounded-t-lg"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <div className="p-3 space-y-2">
                <div className="flex justify-between items-start gap-2 text-sm">
                  <b className="text-gray-800 leading-tight">{p.name}</b>
                  <p className="text-gray-600 font-semibold whitespace-nowrap">
                    {p.price != null ? `$${p.price.toFixed(2)}` : '—'}
                  </p>
                </div>
                {p.description ? (
                  <p className="text-xs text-gray-500 line-clamp-2 leading-snug">{p.description}</p>
                ) : null}
                <button
                  type="button"
                  onClick={() => openModal(p.cloudinaryPath, p.name)}
                  className="mt-1 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md px-3 py-2 transition-colors"
                  aria-label={`Ver ${p.name}`}
                >
                  Ver
                  <span aria-hidden>👀</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para ver la imagen ampliada */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="max-w-4xl w-full bg-white rounded-md overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-medium">{modalTitle}</h3>
              <button className="text-slate-600 hover:text-slate-900 transition-colors" onClick={closeModal} aria-label="Cerrar">
                ✕
              </button>
            </div>
            <div className="relative w-full h-[60vh] md:h-[70vh] bg-white">
              <Image
                src={buildImageUrl(modalImage)}
                alt={modalTitle || "imagen"}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Exportar con React.memo para evitar re-renders innecesarios
export default React.memo(PlatosGrid);
