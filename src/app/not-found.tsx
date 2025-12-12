export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-black text-red-600 mb-4 font-title">404</div>
          <div className="text-6xl mb-6" aria-hidden="true">🍗</div>
        </div>

        {/* Message */}
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-title">
          Página no encontrada
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Volver al inicio
          </a>

          <a
            href="/menu"
            className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Ver menú
          </a>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Páginas populares:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/sucursales"
              className="text-red-600 hover:text-red-700 font-semibold hover:underline"
            >
              Sucursales
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/about"
              className="text-red-600 hover:text-red-700 font-semibold hover:underline"
            >
              Acerca de nosotros
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="/contact"
              className="text-red-600 hover:text-red-700 font-semibold hover:underline"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
