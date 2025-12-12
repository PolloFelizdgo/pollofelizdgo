"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Section from "../componentes/Section";
import SucursalCard from "../componentes/SucursalCard";
import MapClient from "../componentes/MapClient";
import { formatHours } from "../../lib/formatHours";
import { formatPhone } from "../../lib/formatPhone";
import { SUCURSALES } from "../data/sucursales";
import type { Sucursal } from "../../types";
import ReviewForm from "../componentes/ReviewForm";

const slugify = (name: string) => 
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function SucursalesPage() {
  const [mounted, setMounted] = useState(false);
  const [sucursales, setSucursales] = useState<Sucursal[]>(SUCURSALES);
  const [featuredSlug, setFeaturedSlug] = useState<string>(() => 
    slugify(SUCURSALES.find((s) => s.name.toLowerCase().includes("primo"))?.name || SUCURSALES[0]?.name || "")
  );
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedSucursalForReview, setSelectedSucursalForReview] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);

  const orderedSucursales = useMemo(() => {
    const featured = sucursales.find((s) => slugify(s.name) === featuredSlug);
    const others = sucursales.filter((s) => slugify(s.name) !== featuredSlug);
    return featured ? [featured, ...others] : sucursales;
  }, [sucursales, featuredSlug]);

  const featured = orderedSucursales[0];
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!featured?.name) return;
    
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews?sucursal=${encodeURIComponent(featured.name)}`);
        if (!res.ok) return;
        const data = await res.json();
        setReviews(data.reviews || []);
        setAvgRating(data.avgRating || 0);
      } catch { }
    };
    
    fetchReviews();
  }, [featured?.name]);
  
  const handleSelectSucursal = useCallback((name: string) => {
    setFeaturedSlug(slugify(name));
  }, []);

  useEffect(() => {
    const fetchJardines = async () => {
      try {
        const q = "Blvd. Francisco Villa 103, Jardines de Durango, 34200 Durango, Dgo.";
        const res = await fetch(`/api/serpapi?q=${encodeURIComponent(q)}`);
        if (!res.ok) return;
        
        const data = await res.json();
        const candidate = data?.local_results?.[0] || data?.places_results?.[0] || data?.organic_results?.[0];
        if (!candidate) return;

        const address = candidate.address || candidate.formatted_address || candidate.address_string;
        const gps = candidate.gps || (candidate.location ? 
          { lat: candidate.location.lat, lng: candidate.location.lng } : null);

        setSucursales((prev) =>
          prev.map((s) =>
            s.name.includes("Jardines")
              ? { 
                  ...s, 
                  // Normalizar teléfono del API para evitar errores de hidratación
                  phone: formatPhone(candidate.phone) || formatPhone(s.phone),
                  address: address || s.address, 
                  lat: gps?.lat || s.lat, 
                  lng: gps?.lng || s.lng 
                }
              : s
          )
        );
      } catch { }
    };
    fetchJardines();
  }, []);

  return (
    <main>
      {/* Decorative Wave Background */}
      <div className="relative h-16 bg-gradient-to-b from-orange-50 to-gray-50">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 8.33C120 16.7 240 33.3 360 41.7C480 50 600 50 720 45C840 40 960 30 1080 26.7C1200 23.3 1320 26.7 1380 28.3L1440 30V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" fill="url(#paint0_linear_sucursales)"></path>
          <defs>
            <linearGradient id="paint0_linear_sucursales" x1="720" y1="0" x2="720" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff0000" stopOpacity="0.1"></stop>
              <stop offset="1" stopColor="#ffbc00" stopOpacity="0.05"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Section id="sucursales" title="Nuestras Sucursales">
        {mounted && (
          <p className="mb-6">
            Encuentra nuestras sucursales en la ciudad. Haz clic en cada tarjeta para más detalles.
          </p>
        )}
        {mounted && featured && (
          <>
            <section className="mb-8 bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="w-full h-64 md:h-80">
                  {featured.lat && featured.lng ? (
                    <MapClient
                      lat={featured.lat}
                      lng={featured.lng}
                      zoom={16}
                      locations={[{ lat: featured.lat, lng: featured.lng, name: featured.name, address: featured.address, hours: featured.hours || "", phone: featured.phone || "", extension: featured.extension || "", image: featured.image || "" }]}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-500 text-center p-4">Ubicación no disponible</div>
                  )}
                </div>
                <div className="p-8 flex flex-col justify-center gap-4">
                  <h3 className="text-2xl font-bold text-slate-800">{featured.name}</h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {featured.address}
                  </p>
                  
                  {featured.phone && (
                    <p className="text-sm text-slate-800">
                      <strong>Tel:</strong> {formatPhone(featured.phone)}
                      {featured.extension && <span className="text-slate-600"> Ext. {featured.extension}</span>}
                    </p>
                  )}
                  
                  {featured.hours && (
                    <p className="text-sm text-slate-600">
                      <strong className="text-slate-700">Horario:</strong> {formatHours(featured.hours)}
                    </p>
                  )}
                  
                  {avgRating > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-amber-500 text-lg">★</span>
                      <span className="font-semibold text-slate-800">{avgRating.toFixed(1)}</span>
                      <span className="text-slate-600">({reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'})</span>
                    </div>
                  )}
                  
                  <div className="mt-3 flex gap-3">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(featured.address)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block px-4 py-2 bg-gold text-dark rounded-md font-semibold hover:brightness-95 transition-all"
                    >
                      Abrir en Google Maps
                    </a>
                    <button
                      onClick={() => {
                        setSelectedSucursalForReview(featured.name);
                        setShowReviewForm(true);
                      }}
                      className="inline-block px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-all"
                    >
                      ⭐ Dejar Reseña
                    </button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Reviews Section */}
            {reviews.length > 0 && (
              <section className="mb-8 bg-white rounded-lg shadow-sm border border-slate-100 p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Reseñas de {featured.name}</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review, idx) => (
                    <div key={idx} className="border-b border-slate-100 pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{review.name}</span>
                        <span className="text-xs text-slate-500">
                          {new Date(review.createdAt).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {orderedSucursales.slice(1).map((s) => (
                  <SucursalCard key={s.name} name={s.name} address={s.address} lat={s.lat} lng={s.lng} phone={s.phone || ""} extension={s.extension || ""} hours={s.hours || ""} image={s.image || ""} onSelect={handleSelectSucursal} />
                ))}
              </div>
            </div>
          </>
        )}
      </Section>
      
      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          sucursalName={selectedSucursalForReview}
          onClose={() => {
            setShowReviewForm(false);
            setSelectedSucursalForReview("");
          }}
          onSubmit={async (reviewData) => {
            // Refrescar reviews después de enviar
            if (featured?.name) {
              try {
                const res = await fetch(`/api/reviews?sucursal=${encodeURIComponent(featured.name)}`);
                if (res.ok) {
                  const data = await res.json();
                  setReviews(data.reviews || []);
                  setAvgRating(data.avgRating || 0);
                }
              } catch { }
            }
          }}
        />
      )}
    </main>
  );
}
