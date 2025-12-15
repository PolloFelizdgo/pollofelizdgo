// Página: Inicio (src/app/page.tsx)
// Propósito: landing principal. Contiene hero, CTA, grid de platos y mapa de la sucursal.
import Link from "next/link";
import dynamic from "next/dynamic";
import { SUCURSALES } from "./data/sucursales";
import { GRADIENTS, MAP_SETTINGS } from "@/lib/constants";
import { IMAGES } from "@/lib/cloudinary-images";
import LazyLoad from "./componentes/LazyLoad";

// Lazy load heavy components con loading states optimizados
const PlatosGrid = dynamic(() => import("./componentes/PlatosGridClient"), {
  loading: () => (
    <div className="w-full px-4 md:px-8 py-8 bg-white">
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-6" />
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse" />
        ))}
      </div>
    </div>
  ),
  ssr: false,
});

const MapClient = dynamic(() => import("./componentes/MapClient"), {
  loading: () => (
    <div className="w-full h-96 bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">
      <p className="text-gray-500">Cargando mapa...</p>
    </div>
  ),
  ssr: false,
});

const CombinacionSlider = dynamic(() => import("./componentes/CombinacionSlider"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false,
});

const PromoImage = dynamic(() => import("./componentes/PromoImage"), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false,
});

const HomeInteractive = dynamic(() => import("./componentes/HomeInteractive"), {
  loading: () => <div className="h-[60vh] md:h-[70vh] bg-gray-100 animate-pulse" />,
});

// Constants for reusable styles
const GRADIENT_RED_ORANGE = GRADIENTS.RED_ORANGE;
const GRADIENT_BG_LIGHT = GRADIENTS.BG_LIGHT;
const GRADIENT_BG_DARK = GRADIENTS.BG_DARK;

export const metadata = {
  title: "Pollo Feliz Durango | El Mejor Pollo Asado de la Ciudad",
  description: "Pollo Feliz Durango - 22 años sirviendo el mejor pollo asado. 7 sucursales en Durango. Ordena ahora y disfruta del auténtico sabor casero.",
  keywords: "pollo asado durango, pollo feliz, restaurante durango, comida durango, pollo a la leña",
  openGraph: {
    title: "Pollo Feliz Durango | El Mejor Pollo Asado",
    description: "22 años deleitando a familias con el mejor pollo asado de Durango",
    type: "website",
    locale: "es_MX"
  }
};

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Fondo decorativo animado */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTEsMTQ2LDYwLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
      </div>

      {/* Hero Carousel */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <HomeInteractive />
      </section>

      {/* Separador decorativo */}
      <div className={`h-2 bg-gradient-to-r ${GRADIENT_RED_ORANGE}`}></div>

      {/* Sección de Bienvenida */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-yellow-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.15)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">

            {/* Título principal */}
            <h1 className="mb-8 animate-slide-up font-title">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 bg-white px-10 md:px-16 lg:px-24 py-8 md:py-12 lg:py-16 rounded-3xl border-8 border-yellow-400 shadow-2xl">
                <span className="animate-bounce text-[50px] md:text-[60px] leading-none" aria-hidden="true">🍗</span>
                <span className={`font-extrabold bg-gradient-to-r ${GRADIENT_RED_ORANGE} bg-clip-text text-transparent drop-shadow-2xl whitespace-nowrap text-[50px] md:text-[60px] leading-none`}>
                  Pollo Feliz
                </span>
                <span className="animate-bounce text-[50px] md:text-[60px] leading-none" aria-hidden="true">🍗</span>
              </div>
            </h1>

            {/* Línea decorativa */}
            <div className="flex items-center gap-4 mb-6 animate-fade-in" aria-hidden="true">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-red-500"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-red-500"></div>
            </div>

            {/* Subtítulos mejorados */}
            <div className="mb-12 space-y-5 animate-slide-up">
              <p className="text-gray-900 font-bold leading-relaxed drop-shadow-md text-[28px] md:text-[32px] tracking-tight">
                El auténtico <span className="font-black text-red-600 italic">sabor casero</span> que Durango ama
              </p>
              <div className="inline-block bg-yellow-400 px-8 py-3 rounded-full border-4 border-red-600 shadow-xl transform hover:scale-105 transition-transform">
                <p className="text-red-700 font-black text-[20px] md:text-[24px] drop-shadow-sm">
                  🎉 ¡22 años deleitando a miles de familias! 🎉
                </p>
              </div>
              
              {/* CTA Principal */}
              <div className="pt-8">
                <Link href="/menu" className="group relative inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-extrabold font-title text-[15px] shadow-2xl hover:shadow-red-600/80 transition-all duration-300 hover:scale-105 border-4 border-black ring-4 ring-yellow-400">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                  <span className="relative z-10 tracking-wide">VER MENÚ COMPLETO</span>
                  <svg className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* CTA Secundario */}
            <div className="flex justify-center animate-fade-in">
              <Link href="/sucursales" className="group bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full font-bold font-subtitle text-lg border-3 border-black shadow-xl hover:shadow-2xl hover:shadow-orange-600/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="font-extrabold">Ver Sucursales</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner promocional */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <LazyLoad rootMargin="200px">
            <div className={`bg-gradient-to-r ${GRADIENT_RED_ORANGE} rounded-[3rem] overflow-hidden shadow-2xl`}>
              <CombinacionSlider />
            </div>
          </LazyLoad>
        </div>
      </section>

      {/* Quejas y Sugerencias */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.2)_0%,transparent_50%)]" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          {/* Encabezado */}
          <header className="text-center mb-16 bg-white/95 backdrop-blur-sm rounded-3xl py-12 px-6 mx-auto max-w-4xl shadow-2xl border-4 border-yellow-400">
            <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${GRADIENT_RED_ORANGE} text-black px-6 py-3 rounded-full text-sm font-black mb-6 shadow-lg`}>
              <span className="text-2xl" aria-hidden="true">💬</span>
              <span>TU OPINIÓN ES IMPORTANTE</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black font-title text-black mb-6 leading-none tracking-tight">
              Quejas y Sugerencias
            </h2>
            
            <p className="text-black text-xl md:text-2xl leading-relaxed font-bold max-w-3xl mx-auto">
              Comparte tu experiencia con nosotros. <span className="text-red-600 font-black">¡Cada opinión cuenta!</span>
            </p>
          </header>

          {/* Contenedor centrado con QR Code */}
          <div className="flex justify-center">
            <div className="relative bg-white rounded-3xl p-10 border-4 border-yellow-400 overflow-hidden w-full max-w-lg shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-3xl md:text-4xl font-black text-black mb-3 tracking-tight">
                    Escanea el Código
                  </h3>
                  <p className="text-black text-base md:text-lg font-bold leading-relaxed">
                    Usa la cámara de tu celular para <br className="hidden sm:block"/>acceder al formulario de manera rápida
                  </p>
                </div>
                
                <a 
                  href="https://opnform.com/forms/encuesta-de-quejas-y-satisfaccion-del-cliente-tx8a2h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl mb-6 mx-auto w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center border-4 border-yellow-300 hover:border-orange-500 transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl hover:shadow-2xl"
                >
                  <img 
                    src="/imagenes/qr-encuesta.jpg" 
                    alt="QR Code para encuesta de satisfacción" 
                    className="w-full h-full object-contain"
                  />
                </a>
                
                <div className="text-center space-y-3">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 py-4 px-6 rounded-xl shadow-lg border-2 border-yellow-500">
                    <p className="text-base font-black text-black">
                      ✨ ¡Tu opinión nos ayuda a ser mejores! ✨
                    </p>
                  </div>
                  <p className="text-black text-sm font-bold">
                    O haz clic en el código QR para abrir el formulario
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Ubicación con diseño mejorado */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-yellow-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(251,146,60,0.15)_0%,transparent_50%)]" />
          <div className="absolute top-10 right-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-amber-100 text-amber-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
              📍 Encuéntranos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-title)' }}>
              Nuestras Sucursales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              7 ubicaciones estratégicas en Durango para servirte mejor
            </p>
          </div>

          {/* Mapa con sombra y bordes redondeados */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-2">
            <div className="rounded-2xl overflow-hidden">
              <LazyLoad rootMargin="100px">
                <MapClient
                  locations={SUCURSALES.map((s) => ({ 
                    lat: s.lat, 
                    lng: s.lng, 
                    name: s.name, 
                    address: s.address, 
                    hours: s.hours, 
                    phone: s.phone, 
                    extension: s.extension 
                  }))}
                  lat={MAP_SETTINGS.DEFAULT_LAT}
                  lng={MAP_SETTINGS.DEFAULT_LNG}
                  zoom={MAP_SETTINGS.DEFAULT_ZOOM}
                />
              </LazyLoad>
            </div>
          </div>

          {/* CTA adicional */}
          <div className="text-center mt-12">
            <Link href="/sucursales">
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Ver Todas las Sucursales
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}