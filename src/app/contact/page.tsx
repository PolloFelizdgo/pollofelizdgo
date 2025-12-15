import React from "react";

const OPNFORM_URL = "https://opnform.com/forms/contact-form-exuvpi";

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden min-h-screen">
      {/* Fondo decorativo animado - igual que la página de inicio */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,88,12,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="mx-auto max-w-[1400px] py-20 px-4">
        {/* Contenedor del formulario - Diseño mejorado y más grande */}
        <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          {/* iframe del formulario */}
          <div className="p-4 md:p-6 bg-gradient-to-b from-white to-gray-50">
            <iframe
              className="border-none w-full h-[1400px] rounded-2xl shadow-inner"
              id="contact-form-exuvpi"
              src={OPNFORM_URL}
              title="Formulario de contacto Pollo Feliz"
              allow="fullscreen"
            />
          </div>
          
        </div>

        {/* Footer motivacional mejorado */}
        <div className="mt-20 text-center">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 rounded-full"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <svg className="w-10 h-10 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Gracias por tu interés</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            En <span className="font-bold text-red-600">Pollo Feliz</span> valoramos cada mensaje. Nos comprometemos a responderte en el menor tiempo posible.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-red-600 rounded-full"></div>
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-red-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

