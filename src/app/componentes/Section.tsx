"use client";
import React from "react";

// Component: Section
// Ubicación: src/app/componentes/Section.tsx
// Uso: <Section id="seccion1" title="Sección 1">...</Section>
export default function Section({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) {
  return (
    // Full-width section: no side gaps. Add internal padding as needed per breakpoint.
    <section id={id} className="py-20 px-0 w-full">
      <div className="max-w-full mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h2>
        <div className="text-base text-slate-700">{children}</div>
      </div>
    </section>
  );
}
