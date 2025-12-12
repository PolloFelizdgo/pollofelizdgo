"use client";
import dynamic from "next/dynamic";
import React from "react";

// Client wrapper to dynamically load the Map component with ssr: false
// Location: src/app/componentes/MapClient.tsx

// Placeholder component that matches server-side rendering
const MapPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-slate-100">
    <div className="text-slate-500 text-sm">Cargando mapa...</div>
  </div>
);

const Map = dynamic(() => import("./Map"), { 
  ssr: false,
  loading: MapPlaceholder
});

export default function MapClient(props: Record<string, unknown>) {
  return <Map {...(props as any)} />;
}
