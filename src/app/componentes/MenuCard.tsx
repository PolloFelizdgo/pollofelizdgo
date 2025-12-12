"use client";
import React from "react";

// Component: MenuCard (ubicado en src/app/componentes/MenuCard.tsx)
export default function MenuCard({ title, description, price, img }: { title: string; description: string; price: string; img?: string }) {
  return (
    <div className="border rounded overflow-hidden shadow-sm bg-white">
      {img && (
        <div className="w-full h-40 bg-slate-100 flex items-center justify-center">
          <img src={img} alt={title} className="max-w-full max-h-full object-contain" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">{price}</span>
          <button className="bg-slate-200 text-slate-800 px-3 py-1 rounded">Ver</button>
        </div>
      </div>
    </div>
  );
}
