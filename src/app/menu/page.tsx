"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Section from "../componentes/Section";
import { PLATOS } from "../data/platos";
import Image from "next/image";

/*
  Página: /menu
  Propósito: catálogo visual de productos dinámico desde API /api/menu
  Los cambios del admin se reflejan automáticamente aquí
*/

export default function MenuPage() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(9);
  const [modal, setModal] = useState<null | { src: string; title?: string }>(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [products] = useState<any[]>(PLATOS);
  const [loading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoizar categorías para evitar recalcular en cada render
  const categories = useMemo(() => 
    Array.from(new Set(products.map((p) => p.category || "Otros"))), 
    [products]
  );

  // Memoizar lista filtrada para evitar filtrado en cada render
  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Search by name or description
      const q = query.trim().toLowerCase();
      if (q) {
        const inName = p.name.toLowerCase().includes(q);
        const inDesc = (p.desc || "").toLowerCase().includes(q);
        if (!inName && !inDesc) return false;
      }
      if (selectedCategory && selectedCategory !== "Todos") {
        if ((p.category || "") !== selectedCategory) return false;
      }
      if (minPrice !== '' && (p.price == null || p.price < minPrice)) return false;
      if (maxPrice !== '' && (p.price == null || p.price > maxPrice)) return false;
      return true;
    });
  }, [query, selectedCategory, minPrice, maxPrice]);

  // Callbacks memoizados para handlers
  const handleClearFilters = useCallback(() => {
    setQuery('');
    setSelectedCategory(null);
    setMinPrice('');
    setMaxPrice('');
    setVisible(9);
  }, []);

  const handleShowMore = useCallback(() => {
    setVisible((v) => Math.min(filtered.length, v + 9));
  }, [filtered.length]);

  const handleCloseModal = useCallback(() => {
    setModal(null);
  }, []);

  const handleOpenModal = useCallback((src: string, title: string) => {
    setModal({ src, title });
  }, []);

  if (loading) {
    return (
      <main className="relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando menú...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden">
      {/* Fondo decorativo animado - igual que la página de inicio */}
      <div className="fixed inset-0 -z-10 bg-linear-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,88,12,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <Section id="menu-all" title="Nuestro Menú">
        {mounted && (
          <p className="mb-4 text-slate-600">
            Explora nuestras especialidades. Haz clic en una tarjeta para ver la imagen ampliada.
          </p>
        )}

        {!mounted && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full h-48 bg-slate-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-5 bg-slate-200 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-full mb-3 animate-pulse" />
                  <div className="flex justify-between">
                    <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse" />
                    <div className="h-8 bg-slate-200 rounded w-16 animate-pulse" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {mounted && (
          <>

        {/* Filters: search, category, price range */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Buscar</label>
            <input value={query} onChange={(e) => { setQuery(e.target.value); setVisible(9); }} placeholder="Buscar por nombre o descripción" className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Categoría</label>
            <select value={selectedCategory ?? "Todos"} onChange={(e) => { setSelectedCategory(e.target.value === "Todos" ? null : e.target.value); setVisible(9); }} className="w-full px-3 py-2 border rounded">
              <option>Todos</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm text-slate-600 mb-1">Precio mínimo</label>
              <input type="number" value={minPrice as any} onChange={(e) => { const v = e.target.value; setMinPrice(v === '' ? '' : Number(v)); setVisible(9); }} placeholder="0" className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-slate-600 mb-1">Precio máximo</label>
              <input type="number" value={maxPrice as any} onChange={(e) => { const v = e.target.value; setMaxPrice(v === '' ? '' : Number(v)); setVisible(9); }} placeholder="999" className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <button onClick={handleClearFilters} className="px-3 py-2 rounded bg-slate-100 hover:bg-slate-200 transition-colors">Limpiar filtros</button>
          <div className="text-sm text-slate-600">Mostrando {filtered.length} resultados</div>
        </div>

        {/* Product cards grid (visual cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, visible).map((p) => {
            return (
              <article key={p.name} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                  {/* Image: using Cloudinary */}
                  <Image 
                    src={p.imageBase}
                    alt={p.name} 
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* price badge (SVG chip) */}
                  <div className="absolute top-3 right-3">
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-sm font-semibold shadow-sm badge-hover" style={{ backgroundColor: 'var(--gold)', color: 'var(--dark)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                        <path d="M12 1v22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 5H9.5a3.5 3.5 0 000 7H14a3 3 0 010 6H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {p.price != null ? `$ ${p.price.toFixed(2)}` : "--"}
                    </div>
                  </div>

                  {/* heart icon (visual SVG) */}
                  <button className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center badge-hover" aria-label="Favorito" style={{ backgroundColor: 'white', color: 'var(--deepred)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1 21.35l-1.1-.99C5.14 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.14 6.86-8.9 11.86l-1-1.01z" />
                    </svg>
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800">{p.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{p.desc}</p>

                    <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-slate-500">{p.category}</div>
                    <button className="text-sm px-3 py-1 rounded cta-primary transition-transform hover:scale-105" style={{ backgroundColor: 'var(--accent)', color: 'white' }} onClick={() => handleOpenModal(p.imageBase, p.name)}>Ver</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {visible < filtered.length && (
          <div className="mt-6 text-center">
            <button onClick={handleShowMore} className="px-4 py-2 rounded transition-transform hover:scale-105" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>Mostrar más</button>
          </div>
        )}

        {/* Modal (visual) */}
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={handleCloseModal}>
            <div className="max-w-3xl w-full bg-white rounded-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 flex items-center justify-between border-b">
                <h4 className="text-lg font-medium">{modal.title}</h4>
                <button className="text-slate-600 hover:text-slate-900 transition-colors" onClick={handleCloseModal} aria-label="Cerrar">✕</button>
              </div>
              <div className="relative w-full h-[60vh] bg-slate-100">
                <Image 
                  src={modal.src}
                  alt={modal.title || "imagen"} 
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
        </>
        )}

      </Section>
    </main>
  );
}
