"use client";
import React from "react";
import Image from "next/image";
import { formatHours } from "../../lib/formatHours";
import { formatPhone } from "../../lib/formatPhone";

export default function SucursalCard({
  name,
  address,
  lat,
  lng,
  phone,
  extension,
  hours,
  image,
  onSelect,
}: {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  extension?: string;
  hours?: string;
  image?: string;
  onSelect?: (name: string) => void;
}) {
  const handleClick = () => {
    if (onSelect) onSelect(name);
  };

  return (
    <article
      onClick={handleClick}
      className="group relative bg-white border border-slate-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full h-40 md:h-48 bg-slate-100 overflow-hidden flex items-center justify-center">
        <Image
          src={image || "/sucursales/placeholder.svg"}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
          <div className="text-white">
            <h3 className="text-lg md:text-xl font-semibold leading-tight">{name}</h3>
            {hours && <div className="text-xs text-white/80 mt-1">{formatHours(hours)}</div>}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5 lg:p-6">
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{address}</p>

        <div className="mt-4 mb-8">
          {typeof lat === "number" && typeof lng === "number" ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              aria-label={`Abrir ${name} en Google Maps`}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=300x150&markers=${lat},${lng},red-pushpin`}
                alt={`Mapa de ${name}`}
                className="w-40 h-24 object-cover block rounded-md"
              />
            </a>
          ) : (
            <div className="w-36 h-24 bg-slate-100 rounded-md flex items-center justify-center text-xs text-slate-400">
              Mapa no disponible
            </div>
          )}
        </div>

        {phone && (
          <div className="text-sm text-slate-700 flex items-center gap-1 mt-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span>{formatPhone(phone)}</span>
            {extension && <span className="text-slate-500">ext. {extension}</span>}
          </div>
        )}

        <div className="mt-4">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm px-3 py-1 rounded bg-amber-500 text-white hover:bg-amber-600 transition-colors inline-block"
          >
            Ver en mapa
          </a>
        </div>
      </div>
    </article>
  );
}
