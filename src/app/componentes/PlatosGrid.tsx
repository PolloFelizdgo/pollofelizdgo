"use client";
import React, { useState, useEffect } from "react";
import { PLATOS } from "../data/platos";
import CloudinaryImage from "./CloudinaryImage";
import { CldImage } from "next-cloudinary";

// PlatosGrid: muestra una cuadrícula de platillos usando imágenes de Cloudinary
// Las imágenes se cargan automáticamente desde pollo-feliz/platillos/

export default function PlatosGrid() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImage(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section aria-labelledby="platos-title" className="w-full px-4 md:px-8 py-8 bg-white">
      {/* Sección: Nuestros Platos - aquí puedes editar/añadir platillos */}
      <h2 id="platos-title" className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800">Nuestros Platos</h2>

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {PLATOS.map((p, index) => {
          return (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              onClick={() => {
                setModalImage(p.imageBase);
                setModalTitle(p.name);
              }}
            >
              <div className="overflow-visible p-0 relative h-[140px]">
                <CldImage
                  src={p.imageBase}
                  alt={p.name}
                  width={400}
                  height={300}
                  crop="fill"
                  gravity="auto"
                  className="w-full object-cover h-full rounded-t-lg"
                  loading="lazy"
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
              <CldImage
                src={modalImage}
                alt={modalTitle || "imagen"}
                width={1200}
                height={900}
                crop="fit"
                className="w-full h-full object-contain bg-transparent"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
