"use client";
import { useState } from "react";

interface OrderFormProps {
  onClose: () => void;
}

export default function OrderForm({ onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    sucursal: "",
    items: "",
    address: "",
    paymentMethod: "efectivo"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sucursales = [
    "Pollo Feliz - Jardines",
    "Pollo Feliz - Pino Suárez",
    "Pollo Feliz - Fidel Velázquez",
    "Pollo Feliz - Gregorio García",
    "Pollo Feliz - Cerro del Mercado",
    "Pollo Feliz - Felipe Ángeles",
    "Pollo Feliz - Domingo Arrieta"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Guardar pedido
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString(),
          status: "pending"
        })
      });

      // Generar mensaje para WhatsApp
      const message = `🍗 *NUEVO PEDIDO*\n\n` +
        `*Nombre:* ${formData.name}\n` +
        `*Teléfono:* ${formData.phone}\n` +
        `*Sucursal:* ${formData.sucursal}\n` +
        `*Pedido:* ${formData.items}\n` +
        `*Dirección entrega:* ${formData.address || 'Recoger en sucursal'}\n` +
        `*Método de pago:* ${formData.paymentMethod === 'efectivo' ? 'Efectivo' : 'Tarjeta'}`;

      const whatsappUrl = `https://wa.me/5216181293730?text=${encodeURIComponent(message)}`;
      
      setSubmitted(true);
      
      // Abrir WhatsApp después de 1.5 segundos
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setTimeout(() => onClose(), 1000);
      }, 1500);

    } catch (error) {
      console.error("Error al enviar pedido:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Pedido Recibido!
          </h3>
          <p className="text-gray-600 mb-4">
            Te redirigimos a WhatsApp para confirmar tu orden
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            🍗 Hacer Pedido
          </h3>
          <p className="text-gray-600">
            Completa el formulario y confirma por WhatsApp
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="618 123 4567"
              />
            </div>
          </div>

          {/* Sucursal */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sucursal *
            </label>
            <select
              value={formData.sucursal}
              onChange={(e) => setFormData({...formData, sucursal: e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Selecciona una sucursal</option>
              {sucursales.map((suc) => (
                <option key={suc} value={suc}>{suc}</option>
              ))}
            </select>
          </div>

          {/* Pedido */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tu pedido *
            </label>
            <textarea
              value={formData.items}
              onChange={(e) => setFormData({...formData, items: e.target.value})}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Ej: 1 Combinación, 2 Hamburguesas, 1 Ensalada Caesar"
            />
          </div>

          {/* Dirección (opcional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dirección de entrega (opcional)
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Calle, número, colonia (o déjalo vacío para recoger)"
            />
          </div>

          {/* Método de pago */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Método de pago *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="efectivo"
                  checked={formData.paymentMethod === "efectivo"}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="mr-2"
                />
                <span className="text-gray-700">Efectivo</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="tarjeta"
                  checked={formData.paymentMethod === "tarjeta"}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="mr-2"
                />
                <span className="text-gray-700">Tarjeta</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {isSubmitting ? "Procesando..." : "Confirmar en WhatsApp"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Al hacer clic, serás redirigido a WhatsApp para confirmar tu pedido
          </p>
        </form>
      </div>
    </div>
  );
}
