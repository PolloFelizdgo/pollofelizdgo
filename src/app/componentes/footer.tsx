import React from "react";
import Logo from "./Logo";
import { formatPhone } from "../../lib/formatPhone";

export default function Footer() {
  const currentYear = 2025;
  
  return (
  <footer className="w-full px-6 py-10 bg-gradient-to-br from-red-50 via-white to-red-50 text-dark border-t border-red-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
      {/* Logo: tamaño aumentado en el footer. Si quieres cambiar el tamaño
        en el futuro, ajusta el prop `imgClassName` aquí o cambia el
        valor por defecto en `src/app/componentes/Logo.tsx`. */}
      <Logo imgClassName="w-35 h-35 object-contain" textClassName="hidden" />
            {/* Descripción corta junto al logo (solo se muestra en md+). */}
            <div className="hidden md:block">
              <div className="font-semibold text-lg text-gold">Pollo Feliz</div>
              <div className="text-sm text-muted2">Sabor casero en cada bocado</div>
            </div>
          </div>
          <p className="text-sm text-muted2 max-w-xs">Visítanos en cualquiera de nuestras sucursales. Seguimos la tradición y servimos con cariño.</p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold mb-3 text-gold">Enlaces rápidos</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="/menu" className="text-muted hover:text-gold">Menú</a></li>
            <li><a href="/sucursales" className="text-muted hover:text-gold">Sucursales</a></li>
            <li><a href="/about" className="text-muted hover:text-gold">Acerca</a></li>
            <li><a href="/contact" className="text-muted hover:text-gold">Contacto</a></li>
            <li><a href="https://facturacion.galasistemas.com/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold">Facturación</a></li>
          </ul>
        </div>

        {/* Contact & socials */}
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold mb-3 text-gold">Contacto</h4>
          <div className="text-sm text-muted2">Tel: <a href="tel:+5216181293730" className="text-gold">{formatPhone("6181293730")}</a> Ext. 2001</div>
          <div className="text-sm text-muted2">Email: <a href="mailto:soporte@pollofelizdgo.com" className="text-gold">soporte@pollofelizdgo.com</a></div>
          <div className="text-sm text-muted2">Facturación: <a href="mailto:facturacion@pollofelizdgo.com" className="text-gold">facturacion@pollofelizdgo.com</a> Ext. 2002</div>
          <div className="text-sm text-muted2 mt-3">Horario: Lun-Dom 12:00 pm - 6:30 pm</div>

          <div className="mt-4 flex items-center gap-3">
            <a href="https://www.instagram.com/pollofeliz.durango?igsh=OHZic3g2dWU1am9t" aria-label="Instagram" className="text-muted hover:text-gold" title="Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 12a5 5 0 1 0 10 0 5 5 0 0 0-10 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            </a>
            <a href="https://www.facebook.com/share/14S6JKVRsoe/" aria-label="Facebook" className="text-muted hover:text-gold" title="Facebook" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="https://www.tiktok.com/@pollofelizdgo" aria-label="TikTok" className="text-muted hover:text-gold" title="TikTok" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="https://wa.me/5216181293730" aria-label="WhatsApp" className="text-muted hover:text-gold" title="WhatsApp" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a9 9 0 1 0-2.6 6.1L21 22l-3.9-1.3A9 9 0 0 0 21 11.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 14.2c-.4-.2-1.4-.7-1.6-.8-.2-.1-.3-.2-.4.2-.1.4-.4.8-.4.9s-.4.3-.8.1c-.4-.2-1.6-.6-3-1.9-1.1-1.1-1.2-1.8-1.3-2-.1-.4.2-.6.4-.8.2-.2.4-.6.6-.9.2-.3 0-.6-.1-.8-.1-.2-1.6-3.9-2.2-5.3-.6-1.4-1.2-1.2-1.6-1.2-.4 0-.9 0-1.4 0-.5 0-1.2.2-1.8 1.2s-2 2.5-2 5.9 2.1 6.9 2.4 7.3c.3.4 4.1 6.2 9.9 8.7 5.8 2.5 6.4 1.9 7.6 1.8 1.2-.1 3.9-1.6 4.4-3.1.5-1.5.5-2.8.4-3.1-.1-.3-1.1-.6-1.5-.8z" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 border-t border-white/10 pt-4 text-center text-sm text-muted2">
        Copyright © {currentYear} Pollo Feliz. Todos los derechos reservados.
      </div>
      {/* Mobile sticky bar: small CTA and quick actions (hidden on md+) */}
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gold border-t border-white/10 py-2 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a href="/menu" className="inline-flex items-center gap-2 bg-gold text-dark px-3 py-2 rounded-md text-sm font-semibold shadow-sm">
            Ver Menú
          </a>
          <div className="flex items-center gap-3">
            <a href="https://wa.me/5216181293730" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a9 9 0 1 0-2.6 6.1L21 22l-3.9-1.3A9 9 0 0 0 21 11.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="https://www.tiktok.com/@pollofelizdgo" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/14S6JKVRsoe/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
