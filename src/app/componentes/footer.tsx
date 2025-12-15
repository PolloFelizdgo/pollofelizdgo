import React from "react";
import Logo from "./Logo";
import { formatPhone } from "../../lib/formatPhone";

export default function Footer() {
  const currentYear = 2025;
  
  return (
  <footer className="w-full px-4 sm:px-6 py-8 sm:py-12 bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Grid responsivo: 1 col en móvil, 2 cols en tablet, 3 cols en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          
          {/* Brand */}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <Logo imgClassName="w-12 h-12 sm:w-16 sm:h-16 object-contain" textClassName="hidden" />
              <div>
                <div className="font-bold text-base sm:text-lg text-yellow-400">Pollo Feliz</div>
                <div className="text-xs sm:text-sm text-gray-400">Sabor casero en cada bocado</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Visítanos en cualquiera de nuestras sucursales. Seguimos la tradición y servimos con cariño desde 2003.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col">
            <h4 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 text-yellow-400">Enlaces Rápidos</h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li><a href="/menu" className="text-gray-300 hover:text-yellow-400 transition-colors">📖 Menú</a></li>
              <li><a href="/sucursales" className="text-gray-300 hover:text-yellow-400 transition-colors">📍 Sucursales</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">ℹ️ Acerca de Nosotros</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">✉️ Contacto</a></li>
              <li><a href="/bolsa-de-trabajo" className="text-gray-300 hover:text-yellow-400 transition-colors">💼 Bolsa de Trabajo</a></li>
              <li><a href="https://facturacion.galasistemas.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">🧾 Facturación</a></li>
            </ul>
          </div>

          {/* Contact & socials */}
          <div className="flex flex-col">
            <h4 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 text-yellow-400">Contacto</h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span>📞</span>
                <div>
                  <a href="tel:+5216181293730" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    {formatPhone("6181293730")}
                  </a>
                  <span className="text-gray-400"> Ext. 2001</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span>📧</span>
                <div className="break-all">
                  <a href="mailto:soporte@pollofelizdgo.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    soporte@pollofelizdgo.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span>🧾</span>
                <div className="break-all">
                  <a href="mailto:facturacion@pollofelizdgo.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    facturacion@pollofelizdgo.com
                  </a>
                  <span className="text-gray-400"> Ext. 2002</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2 pt-2">
                <span>🕐</span>
                <span className="text-gray-300">Lun-Dom 12:00 pm - 6:30 pm</span>
              </div>
            </div>

            {/* Social media icons */}
            <div className="mt-4 sm:mt-6 flex items-center gap-4">
              <a href="https://www.instagram.com/pollofeliz.durango?igsh=OHZic3g2dWU1am9t" 
                 aria-label="Instagram" 
                 className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110" 
                 title="Instagram" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 12a5 5 0 1 0 10 0 5 5 0 0 0-10 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              
              <a href="https://www.facebook.com/share/14S6JKVRsoe/" 
                 aria-label="Facebook" 
                 className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110" 
                 title="Facebook" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              
              <a href="https://www.tiktok.com/@pollofelizdgo" 
                 aria-label="TikTok" 
                 className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110" 
                 title="TikTok" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              
              <a href="https://wa.me/5216181293730" 
                 aria-label="WhatsApp" 
                 className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110" 
                 title="WhatsApp" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5a9 9 0 1 0-2.6 6.1L21 22l-3.9-1.3A9 9 0 0 0 21 11.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.5 14.2c-.4-.2-1.4-.7-1.6-.8-.2-.1-.3-.2-.4.2-.1.4-.4.8-.4.9s-.4.3-.8.1c-.4-.2-1.6-.6-3-1.9-1.1-1.1-1.2-1.8-1.3-2-.1-.4.2-.6.4-.8.2-.2.4-.6.6-.9.2-.3 0-.6-.1-.8-.1-.2-1.6-3.9-2.2-5.3-.6-1.4-1.2-1.2-1.6-1.2-.4 0-.9 0-1.4 0-.5 0-1.2.2-1.8 1.2s-2 2.5-2 5.9 2.1 6.9 2.4 7.3c.3.4 4.1 6.2 9.9 8.7 5.8 2.5 6.4 1.9 7.6 1.8 1.2-.1 3.9-1.6 4.4-3.1.5-1.5.5-2.8.4-3.1-.1-.3-1.1-.6-1.5-.8z" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright - Separador visible y responsive */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-800 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            Copyright © {currentYear} <span className="text-yellow-400 font-semibold">Pollo Feliz Durango</span>. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            🍗 22 años deleitando familias duranguenses
          </p>
        </div>
      </div>

      {/* Mobile sticky bar: pequeña barra flotante solo en móviles */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-yellow-400 py-2 px-4 z-50 shadow-lg">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <a href="/menu" 
             className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-yellow-300 transition-colors">
            📖 Ver Menú
          </a>
          <div className="flex items-center gap-3">
            <a href="https://wa.me/5216181293730" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-gray-300 hover:text-yellow-400 transition-colors" 
               aria-label="WhatsApp">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5a9 9 0 1 0-2.6 6.1L21 22l-3.9-1.3A9 9 0 0 0 21 11.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="tel:+5216181293730" 
               className="text-gray-300 hover:text-yellow-400 transition-colors" 
               aria-label="Llamar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
