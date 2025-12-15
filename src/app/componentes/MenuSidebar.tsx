"use client";
import React, { useEffect, useMemo, useState } from "react";
import { PLATOS } from "../data/platos";
import Image from "next/image";
import { CLOUDINARY_CONFIG } from "@/lib/cloudinary-images";

export default function MenuSidebar() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [modal, setModal] = useState<null | { src: string; title?: string }>(null);

  const categories = useMemo(() => {
    const s = new Set<string>();
    PLATOS.forEach((p) => { if (p.category) s.add(p.category); });
    return ["Todos", ...Array.from(s)];
  }, []);

  const filtered = PLATOS.filter((p) => {
    const byCategory = !activeCategory || activeCategory === "Todos" ? true : p.category === activeCategory;
    const byQuery = !query ? true : p.name.toLowerCase().includes(query.toLowerCase());
    return byCategory && byQuery;
  });

  return (
    // id added so Navbar can navigate/scroll to this menu on /sucursales
    <aside id="sucursales-menu" className="w-full lg:w-80">
      <div className="sticky top-20 space-y-4">
        <div className="p-3 bg-white border rounded">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold">Menú</h4>
          </div>

          <div className="mb-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar plato..."
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>

          <div className="flex gap-2 flex-wrap mb-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c === "Todos" ? null : c)}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-xs ${activeCategory === c || (!activeCategory && c === "Todos") ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-800"}`}
                title={c}
              >
                {c === "Todos" ? "T" : c.charAt(0)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-white border rounded">
          <div className="text-sm text-slate-600 mb-2">Platos</div>
          <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
            {filtered.map((p) => {
              return (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="relative w-16 h-12 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                    <Image 
                      src={`https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/c_fill,g_auto,w_128,h_96,f_auto,q_auto/${p.imageBase}`}
                      alt={p.name} 
                      fill
                      sizes="64px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.category} • {p.price ? `$ ${p.price.toFixed(2)}` : "--"}</div>
                  </div>
                  <div>
                    <button
                      className="px-2 py-1 text-xs bg-slate-200 text-slate-800 rounded"
                      onClick={() => setModal({ src: p.imageBase, title: p.name })}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal visualizador de imagenes */}
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setModal(null)}>
            <div className="max-w-md w-full bg-white rounded overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-3 border-b flex items-center justify-between">
                <h3 className="text-lg font-medium">{modal.title}</h3>
                <button className="text-slate-600" onClick={() => setModal(null)} aria-label="Cerrar">✕</button>
              </div>
              <div className="relative w-full h-56 bg-slate-100">
                <Image 
                  src={`https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/c_fit,w_600,h_400,f_auto,q_auto/${modal.src}`}
                  alt={modal.title || "imagen"} 
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
