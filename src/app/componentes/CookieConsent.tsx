"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si existe la cookie de consentimiento
    const checkCookieConsent = () => {
      const consent = localStorage.getItem("cookie_consent");
      
      // Si no existe la cookie, mostrar el banner
      if (!consent) {
        setTimeout(() => {
          setShowBanner(true);
          // Bloquear scroll cuando el banner está visible
          document.body.style.overflow = 'hidden';
          setTimeout(() => setIsVisible(true), 50);
        }, 1000);
      }
    };

    checkCookieConsent();
  }, []);

  const acceptCookies = () => {
    // Guardar cookie de consentimiento con valor 'accepted'
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // Expira en 30 días
    
    localStorage.setItem("cookie_consent", "accepted");
    localStorage.setItem("cookie_consent_date", expiryDate.toISOString());
    
    // Animación de cierre
    setIsVisible(false);
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
      setShowBanner(false);
      // Evento personalizado para notificar la aceptación
      window.dispatchEvent(new CustomEvent('cookiesAccepted', {
        detail: { timestamp: new Date().toISOString() }
      }));
    }, 300);
  };

  const declineCookies = () => {
    // Guardar rechazo de cookies
    localStorage.setItem("cookie_consent", "declined");
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    
    // Cerrar banner
    setIsVisible(false);
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
      setShowBanner(false);
    }, 300);
  };

  // Si el banner no debe mostrarse, no renderizar nada
  if (!showBanner) return null;

  return (
    <>
      {/* Overlay oscuro - Bloquea toda la interacción */}
      <div 
        id="cookie-banner-overlay"
        className={`fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          zIndex: 999998,
          willChange: 'opacity'
        }}
        onClick={acceptCookies}
        aria-label="Click para aceptar cookies"
      />
      
      {/* Banner de Cookies - Pop-up centrado */}
      <div 
        id="cookie-banner"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ 
          zIndex: 999999,
          boxShadow: '0 25px 80px rgba(0,0,0,0.95), 0 0 100px rgba(255,188,0,0.4), 0 0 200px rgba(255,0,0,0.2)',
          willChange: 'transform, opacity'
        }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-red-900 to-black rounded-3xl border-4 border-yellow-400 overflow-hidden shadow-[0_0_50px_rgba(255,188,0,0.8)]">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-5 flex items-center justify-between shadow-lg border-b-2 border-yellow-600">
            <div className="flex items-center gap-3">
              <span className="text-5xl" role="img" aria-label="Cookie">🍪</span>
              <div>
                <h3 id="cookie-banner-title" className="text-black font-black text-xl md:text-2xl">
                  ¡Importante!
                </h3>
                <p className="text-black/70 text-xs font-semibold">Aviso de Cookies</p>
              </div>
            </div>
            <button
              onClick={declineCookies}
              className="text-black hover:text-red-700 transition-colors text-4xl leading-none font-bold"
              aria-label="Cerrar banner de cookies"
              type="button"
            >
              ×
            </button>
          </div>
          
          {/* Contenido */}
          <div className="p-6 md:p-8 bg-black/30">
            <div className="bg-yellow-400/10 border-l-4 border-yellow-400 p-4 rounded-lg mb-4">
              <p id="cookie-banner-description" className="text-white text-base md:text-lg font-semibold leading-relaxed">
                Este sitio web utiliza cookies para mejorar tu experiencia de navegación, personalizar contenido y analizar nuestro tráfico.
              </p>
            </div>
            
            <p className="text-gray-300 text-sm mb-6 text-center">
              Al hacer clic en <span className="text-yellow-400 font-bold">"Aceptar"</span>, nos autorizas a usar cookies según nuestra política de privacidad. 
              <span className="block mt-2 text-yellow-400 font-bold">Las cookies expirarán en 30 días 📅</span>
            </p>
            
            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="accept-cookies"
                onClick={acceptCookies}
                type="button"
                className="flex-1 px-6 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-2xl font-black text-base md:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-3 border-white"
                aria-label="Aceptar cookies y continuar"
              >
                ✓ Aceptar y Continuar
              </button>
              <button
                id="decline-cookies"
                onClick={declineCookies}
                type="button"
                className="px-6 py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-2xl font-semibold text-sm transition-all duration-300 border-2 border-gray-600 hover:border-gray-400"
                aria-label="Rechazar cookies"
              >
                No, gracias
              </button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gradient-to-r from-black/70 to-black/50 px-6 py-4 text-center border-t border-yellow-400/30">
            <p className="text-gray-300 text-xs md:text-sm font-semibold">
              🔒 Pollo Feliz Durango • Protegemos tu privacidad
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Cookie válida por 30 días desde la aceptación
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
