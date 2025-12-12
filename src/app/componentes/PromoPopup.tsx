"use client";
import { useState, useCallback } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UI_CONSTANTS, STORAGE_KEYS, API_ENDPOINTS } from "@/lib/constants";
import type { FormState } from "@/types/common";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const [hasSeenPopup, setHasSeenPopup] = useSessionStorage(STORAGE_KEYS.PROMO_POPUP_SEEN, false);
  const [hasSubscribed, setHasSubscribed] = useLocalStorage(STORAGE_KEYS.PROMO_SUBSCRIBED, false);

  // Show popup after delay if not seen
  useState(() => {
    if (!hasSeenPopup && !hasSubscribed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasSeenPopup(true);
      }, UI_CONSTANTS.POPUP_DELAY_MS);
      
      return () => clearTimeout(timer);
    }
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, isSuccess: false, error: null });

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: "Suscriptor Promoción",
          message: "Suscripción a promoción",
          type: "promo"
        })
      });

      if (!response.ok) {
        throw new Error("Error al enviar suscripción");
      }

      setHasSubscribed(true);
      setFormState({ isSubmitting: false, isSuccess: true, error: null });
      
      // Auto-close after success
      setTimeout(() => {
        setIsOpen(false);
      }, UI_CONSTANTS.AUTO_CLOSE_DELAY_MS);
    } catch (error) {
      console.error("Error al suscribirse:", error);
      setFormState({ 
        isSubmitting: false, 
        isSuccess: false, 
        error: "Error al enviar. Por favor intenta de nuevo." 
      });
    }
  }, [email, setHasSubscribed]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop simplificado */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal optimizado */}
      <div className="relative bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 rounded-3xl shadow-2xl max-w-lg w-full p-1">
        {/* Contenedor interno */}
        <div className="relative bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 rounded-3xl p-8 border-4 border-white">
          {/* Close button mejorado */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-full p-2 transition-all duration-300 transform hover:scale-110 shadow-lg z-10"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!formState.isSuccess ? (
            <>
              {/* Content con más énfasis */}
              <div className="text-center mb-6">
                <div className="text-7xl mb-4" role="img" aria-label="Celebración">🎉</div>
              </div>

              {/* Form simplificado */}
              <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="✉️ Tu correo electrónico"
                    required
                    className="w-full px-6 py-4 rounded-full border-4 border-white bg-white text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold text-lg shadow-xl"
                  />
                </div>

                {formState.error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                    <p className="text-sm">{formState.error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="relative w-full bg-white text-red-600 font-black text-xl py-5 rounded-full hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 transform hover:scale-110 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed border-4 border-yellow-400 overflow-hidden group focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  aria-label={formState.isSubmitting ? "Enviando suscripción" : "Suscribirse a promoción"}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {formState.isSubmitting ? (
                      <>
                        <span className="animate-spin" role="status" aria-label="Cargando">⏳</span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        🎁 ¡SUSCRIBIRME! 🎁
                      </>
                    )}
                  </span>
                </button>

                <div className="bg-white/90 rounded-2xl p-4 shadow-lg border-2 border-yellow-300">
                  <p className="text-red-600 font-bold text-sm text-center flex items-center justify-center gap-2">
                    <span className="text-xl">📱</span>
                    Código vía WhatsApp: <span className="text-green-600">618 129 3730</span>
                  </p>
                </div>
              </form>

              {/* Términos mejorados */}
              <div className="mt-5 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                <p className="text-white text-xs text-center font-semibold">
                  ⚡ Recibe noticias sobre nuestras promociones
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="text-8xl mb-6">✅</div>
              
              <div className="bg-white rounded-3xl p-6 mb-6 shadow-2xl border-4 border-yellow-400">
                <h3 className="text-4xl font-black text-green-600 mb-3">
                  ¡PERFECTO!
                </h3>
                <p className="text-gray-700 text-lg font-bold">
                  Tu suscripción fue exitosa
                </p>
              </div>
              
              <div className="bg-green-500 rounded-2xl p-5 shadow-xl border-4 border-white">
                <p className="text-white text-lg font-bold mb-3">
                  📲 Contáctanos por WhatsApp:
                </p>
                <a 
                  href="https://wa.me/5216181293730?text=Hola,%20me%20suscribí%20a%20las%20promociones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-green-600 font-black text-2xl px-8 py-4 rounded-full hover:bg-yellow-300 hover:text-green-700 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                >
                  <span className="text-3xl">💬</span>
                  618 129 3730
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        /* Estilos CSS simplificados para mejor rendimiento */
      `}</style>
    </div>
  );
}
