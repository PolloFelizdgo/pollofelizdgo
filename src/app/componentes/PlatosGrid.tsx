"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { PLATOS } from "../data/platos";
import Image from "next/image";
import { CLOUDINARY_CONFIG } from "@/lib/cloudinary-images";

// PlatosGrid: muestra una cuadrícula de platillos usando imágenes de Cloudinary
// Optimizado con React.memo y lazy loading

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  cloudinaryPath: string;
  category: string;
  available: boolean;
  bestseller?: boolean;
};

function PlatosGrid() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Error al cargar menú');
        const data = await response.json();
        
        // Combinar todos los productos de todas las categorías
        const allProducts: Product[] = [];
        if (data.menu) {
          Object.values(data.menu).forEach((category: any) => {
            if (Array.isArray(category)) {
              allProducts.push(...category.filter((p: Product) => p.available));
            }
          });
        }
        
        setProducts(allProducts);
      } catch (error) {
        console.error('Error cargando productos:', error);
        // Si falla la API, no mostrar nada (ya no usar PLATOS estáticos)
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

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

  if (loading) {
    return (
      <section className="w-full px-4 md:px-8 py-8 bg-white">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800">Nuestros Platos</h2>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
              <div className="h-[140px] bg-gray-200" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

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
              <div className="overflow-hidden relative h-[140px] w-full">
                <Image
                  src={`https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/c_fill,g_auto,w_400,h_300,f_auto,q_auto/${p.cloudinaryPath}`}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover rounded-t-lg"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <div className="p-3 flex justify-between items-center text-sm">
                <b className="text-gray-800">{p.name}</b>
                <p className="text-gray-500">${p.price.toFixed(2)}</p>
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
                src={`https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/c_fit,w_1200,h_900,f_auto,q_auto/${modalImage}`}
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
