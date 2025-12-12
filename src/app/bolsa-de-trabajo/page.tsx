// Página: Bolsa de Trabajo (src/app/bolsa-de-trabajo/page.tsx)
// Propósito: Mostrar vacantes disponibles para Pollo Feliz
import React from "react";

export default function BolsaDeTrabajoPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black overflow-hidden">
      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-full text-sm font-bold mb-6">
            <span className="text-2xl">💼</span>
            <span className="text-lg">ÚNETE A NUESTRO EQUIPO</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-black mb-4 drop-shadow-lg tracking-tight bg-white/95 rounded-3xl py-6 px-8 inline-block">
            Bolsa de Trabajo
          </h1>
          
          <p className="text-black text-2xl md:text-3xl font-bold max-w-3xl mx-auto bg-yellow-400 rounded-2xl py-5 px-8 mt-6 inline-block border-4 border-yellow-600 shadow-xl">
            ¡Se solicita Parrillero!
          </p>
        </div>

        {/* Vacante destacada */}
        <div className="bg-white rounded-3xl p-10 border-4 border-yellow-400 shadow-2xl max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-red-600 text-white rounded-2xl py-4 px-6 mb-6 border-4 border-red-800 shadow-lg">
              <h2 className="text-5xl font-black mb-2 tracking-tight">
                POLLO FELIZ
              </h2>
              <p className="text-sm font-semibold opacity-90">Durango</p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl py-6 px-8 mb-4 border-4 border-yellow-600">
              <p className="text-3xl text-black font-black mb-2">
                🔥 PARRILLERO 🔥
              </p>
              <p className="text-lg text-gray-900 font-bold">
                Tiempo completo
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-xl py-3 px-6">
              <p className="text-lg text-gray-800 font-semibold">
                📍 Sucursal Fidel Velázquez
              </p>
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border-4 border-blue-300 shadow-lg">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl">📧</span>
                <p className="text-blue-900 font-black text-3xl">CONTACTO</p>
              </div>
              <a 
                href="mailto:rh@pollofelizdgo.com"
                className="block text-blue-600 hover:text-blue-800 underline font-bold text-2xl transition-colors"
              >
                rh@pollofelizdgo.com
              </a>
              <p className="text-gray-700 text-base font-semibold mt-3 bg-white rounded-lg py-2 px-4 inline-block">
                📄 Envíanos tu CV
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://wa.me/526182230548?text=Hola,%20me%20interesa%20aplicar%20para%20la%20vacante%20de%20Parrillero%20en%20Pollo%20Feliz."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-12 py-6 rounded-full font-black text-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl border-4 border-green-700"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Aplicar por WhatsApp
            </a>
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl py-3 px-6 inline-block border-2 border-white/30">
              <p className="text-white text-lg font-bold flex items-center justify-center gap-2">
                ⚡ ¡Respuesta inmediata!
              </p>
            </div>
          </div>
        </div>



      </div>
    </main>
  );
}
