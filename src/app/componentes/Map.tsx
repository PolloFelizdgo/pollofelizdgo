"use client";
import React, { useEffect, useRef, useState } from "react";
import { formatPhone } from "../../lib/formatPhone";

// Map component (ubicado en src/app/componentes/Map.tsx)
// Requiere: npm install leaflet
// Muestra un mapa OpenStreetMap con un punto rojo (circleMarker) y popup con datos de la sucursal.

type LocationPoint = {
  lat: number;
  lng: number;
  name?: string;
  address?: string;
  hours?: string;
  phone?: string;
  extension?: string;
};

type HighlightInfo = {
  name?: string;
  address?: string;
  hours?: string;
  phone?: string;
  extension?: string;
};

export default function Map({
  lat = 24.027717,
  lng = -104.653175,
  zoom = 15,
  address = "Blvd. Francisco Villa 103, Jardines de Durango, 34200 Durango, Dgo.",
  name = "Sucursal Pollo Feliz - Jardines de Durango",
  className = "w-full h-80 md:h-96 shadow-sm rounded overflow-hidden",
  locations,
}: {
  lat?: number;
  lng?: number;
  zoom?: number;
  address?: string;
  name?: string;
  // className allows callers to set a smaller map height for cards, e.g. 'h-48'
  className?: string;
  // Optional: multiple locations to render as red circle markers
  locations?: Array<LocationPoint>;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<unknown>(null);
  const [hovered, setHovered] = useState<null | HighlightInfo>(null);
  const [selected, setSelected] = useState<null | HighlightInfo>(null);
  const hoveredMarkerRef = useRef<any>(null);
  const selectedMarkerRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    // dynamic import to avoid SSR issues
    (async () => {
      // dynamic import of leaflet; we cast carefully to avoid leaking `any` widely.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (await import('leaflet')) as any;

      if (!mounted) return;
      if (!mapRef.current) return;

      // create map only once
      if (leafletMapRef.current) {
        // leafletMapRef is typed as unknown; cast for method access
        (leafletMapRef.current as any).setView([lat, lng], zoom);
        return;
      }

      const map = L.map(mapRef.current, { scrollWheelZoom: false }).setView([lat, lng], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // If a `locations` array is provided, render all of them as red markers.
  const defaultSchedule = 'LUNES A DOMINGO DE 12 PM A 6:30 PM';
  const defaultPhone = '618 129 3735';

      if (Array.isArray(locations) && locations.length > 0) {
        locations.forEach((loc) => {
          try {
            const m = L.circleMarker([loc.lat, loc.lng], {
              radius: 8,
              color: '#ff0000',
              fillColor: '#ff0000',
              fillOpacity: 0.9,
            }).addTo(map);
            const hours = loc.hours || defaultSchedule;
            const phone = loc.phone || defaultPhone;
            const ext = loc.extension ? ` Ext. ${loc.extension}` : '';
            const formattedPhone = formatPhone(phone);
            const phoneLine = formattedPhone ? `<div>📞 <strong>${formattedPhone}${ext}</strong></div>` : '';
            const popupHtml = `
              <div>
                <strong>${loc.name || 'Sucursal'}</strong>
                <div>${loc.address || ''}</div>
                ${phoneLine}
                <div>📅 <strong>Horario:</strong> ${hours}</div>
              </div>
            `;
              // Instead of opening a popup, set hovered state so the parent
              // component can render a side info panel. This avoids popups
              // and centralizes the UI.
              m.bindPopup(popupHtml);
                // marker visual feedback and side-panel behavior
                const defaultRadius = (m.options && (m.options as any).radius) || 8;
                m.on('mouseover', () => {
                  try {
                    if (selectedMarkerRef.current !== m) {
                      m.setStyle?.({ radius: Math.max(defaultRadius, 12) });
                      hoveredMarkerRef.current = m;
                    }
                    setHovered({ name: loc.name, address: loc.address, hours, phone, extension: loc.extension });
                  } catch (e) { /* ignore */ }
                });
                m.on('mouseout', () => {
                  try {
                    if (hoveredMarkerRef.current === m && selectedMarkerRef.current !== m) {
                      m.setStyle?.({ radius: defaultRadius });
                      hoveredMarkerRef.current = null;
                    }
                    setHovered(null);
                  } catch (e) { /* ignore */ }
                });
                m.on('click', () => {
                  try {
                    // clear previous selected marker visual
                    if (selectedMarkerRef.current && selectedMarkerRef.current !== m) {
                      try { selectedMarkerRef.current.setStyle?.({ radius: 8 }); } catch (_) {}
                    }
                    selectedMarkerRef.current = m;
                    m.setStyle?.({ radius: Math.max(defaultRadius, 14) });
                    // Smoothly pan/zoom the map to the selected marker for better UX
                    try { map.flyTo([loc.lat, loc.lng], Math.max(map.getZoom(), zoom), { animate: true, duration: 0.7 }); } catch (e) {}
                    setSelected({ name: loc.name, address: loc.address, hours, phone, extension: loc.extension });
                  } catch (e) { /* ignore */ }
                });
                m.on('touchstart', () => { try { m.fire('click'); } catch (e) {} });
          } catch (e) {
            // ignore single marker error and continue
          }
        });
      } else {
        // fallback: render a single marker using lat/lng props
        const marker = L.circleMarker([lat, lng], {
          radius: 8,
          color: '#ff0000',
          fillColor: '#ff0000',
          fillOpacity: 0.9,
        }).addTo(map);

        const popupHtml = `
          <div>
            <strong>${name}</strong>
            <div>${address}</div>
            <div>� <strong>${defaultPhone}</strong></div>
            <div>�📅 <strong>Horario:</strong> ${defaultSchedule}</div>
          </div>
        `;
                marker.bindPopup(popupHtml);
                const defaultRadius = (marker.options && (marker.options as any).radius) || 8;
                marker.on('mouseover', () => { try { if (selectedMarkerRef.current !== marker) marker.setStyle?.({ radius: Math.max(defaultRadius,12)}); hoveredMarkerRef.current = marker; setHovered({ name, address, hours: defaultSchedule, phone: defaultPhone }); } catch (e) {} });
                marker.on('mouseout', () => { try { if (hoveredMarkerRef.current === marker && selectedMarkerRef.current !== marker) marker.setStyle?.({ radius: defaultRadius }); hoveredMarkerRef.current = null; setHovered(null); } catch (e) {} });
                marker.on('click', () => { try { if (selectedMarkerRef.current && selectedMarkerRef.current !== marker) { try { selectedMarkerRef.current.setStyle?.({ radius: 8 }); } catch(_){} } selectedMarkerRef.current = marker; marker.setStyle?.({ radius: Math.max(defaultRadius,14)}); try { map.flyTo([lat, lng], Math.max(map.getZoom(), zoom), { animate: true, duration: 0.7 }); } catch(e){} setSelected({ name, address, hours: defaultSchedule, phone: defaultPhone }); } catch (e) {} });
                marker.on('touchstart', () => { try { marker.fire('click'); } catch (e) {} });
      }

      leafletMapRef.current = map as unknown;
    })();

    return () => { mounted = false; if (leafletMapRef.current) { (leafletMapRef.current as any).remove(); leafletMapRef.current = null; } };
  }, [lat, lng, zoom, address, name, locations]);

    return (
    <div className={className} style={{ position: 'relative' }}>
      {/* map container */}
      <div ref={mapRef} id="map" style={{ width: "100%", height: "100%" }} />

      {/* Side info panel that appears when hovering over a marker. Rendered
          always for smoother transitions but visually hidden when `hovered` is null. */}
      <div
        className={`absolute top-4 right-4 w-72 p-3 bg-white rounded shadow-lg z-40 transition-all duration-300 transform hidden md:block ${
          hovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!hovered}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm font-semibold text-slate-800">{hovered?.name}</div>
            <div className="text-xs text-slate-600">{hovered?.address}</div>
            {hovered?.phone && (
              <div className="text-xs text-slate-500 mt-2">
                Tel: {formatPhone(hovered.phone)}
                {hovered.extension ? ` Ext. ${hovered.extension}` : ""}
              </div>
            )}
            {hovered?.hours && <div className="text-xs text-slate-500 mt-2">Horario: {hovered.hours}</div>}
          </div>
          <button className="ml-2 text-slate-400 hover:text-slate-600" onClick={() => setHovered(null)} aria-label="Cerrar panel">✕</button>
        </div>
      </div>
      {/* Mobile bottom sheet for selected marker (tap/click) */}
      {/* Mobile bottom sheet for selected marker (tap/click). We render it
          always but animate translate so it slides in/out smoothly. */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white rounded-t-xl shadow-xl z-50 transition-transform duration-300 ${
          selected ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
        aria-hidden={!selected}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-base font-semibold text-slate-800">{selected?.name}</div>
            <div className="text-sm text-slate-600">{selected?.address}</div>
            {selected?.phone && (
              <div className="text-sm text-slate-500 mt-2">
                Tel: {formatPhone(selected.phone)}
                {selected.extension ? ` Ext. ${selected.extension}` : ""}
              </div>
            )}
            {selected?.hours && <div className="text-sm text-slate-500 mt-2">Horario: {selected.hours}</div>}
          </div>
          <button
            aria-label="Cerrar"
            className="ml-3 text-slate-500"
            onClick={() => {
              try {
                if (selectedMarkerRef.current) {
                  try { selectedMarkerRef.current.setStyle?.({ radius: 8 }); } catch (e) {}
                  selectedMarkerRef.current = null;
                }
              } catch (e) {}
              setSelected(null);
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
