"use client";
import { useState } from "react";

interface ReviewFormProps {
  sucursalName: string;
  onClose: () => void;
  onSubmit: (review: ReviewData) => void;
}

export interface ReviewData {
  sucursal: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewForm({ sucursalName, onClose, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reviewData: ReviewData = {
      sucursal: sucursalName,
      name,
      rating,
      comment,
      date: new Date().toISOString()
    };

    try {
      // Guardar review
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
      });

      onSubmit(reviewData);
      onClose();
    } catch (error) {
      console.error("Error al enviar review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Deja tu reseña
        </h3>
        <p className="text-gray-600 mb-6">{sucursalName}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Stars */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Calificación
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <svg
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tu nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tu comentario
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Cuéntanos tu experiencia..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Enviar Reseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
