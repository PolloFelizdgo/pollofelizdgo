"use client";
import dynamic from "next/dynamic";

const PlatosGrid = dynamic(() => import("./PlatosGrid"), { 
  ssr: false,
  loading: () => (
    <div className="w-full px-4 md:px-8 py-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800">Nuestros Platos</h2>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="h-35 bg-gray-200" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
});

export default PlatosGrid;
