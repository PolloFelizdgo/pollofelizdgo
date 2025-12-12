import React from "react";

const OPNFORM_URL = "https://opnform.com/forms/contact-form-exuvpi";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Decorative Wave Background */}
      <div className="relative h-16 bg-gradient-to-b from-orange-50 to-gray-50">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 8.33C120 16.7 240 33.3 360 41.7C480 50 600 50 720 45C840 40 960 30 1080 26.7C1200 23.3 1320 26.7 1380 28.3L1440 30V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" fill="url(#paint0_linear_contact)"></path>
          <defs>
            <linearGradient id="paint0_linear_contact" x1="720" y1="0" x2="720" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff0000" stopOpacity="0.1"></stop>
              <stop offset="1" stopColor="#ffbc00" stopOpacity="0.05"></stop>
            </linearGradient>
          </defs>
        </svg>
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

