"use client";
import dynamic from "next/dynamic";
import React from "react";

// Cargamos el carrusel solo en cliente para evitar desajustes de hidratación.
const HeroCarousel = dynamic(() => import("./HeroCarousel"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-64 md:h-96 bg-neutral-950 text-white/60 flex items-center justify-center">
      Cargando carrusel...
    </div>
  ),
});

export default function HomeInteractive() {
  return <HeroCarousel />;
}
