"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PromoImage from "./PromoImage";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ingredients: string[];
  image: string;
  fallbackImage: string;
  badge: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Combinación",
    subtitle: "Perfecta",
    description: "El platillo que conquistó Durango desde 2003.",
    ingredients: [
      "Pollo jugoso asado a la perfección",
      "Guarniciones frescas del día",
      "Tortillas hechas a mano"
    ],
    image: "pollo-feliz/platillos/combinacion",
    fallbackImage: "pollo-feliz/platillos/combinacion",
    badge: "¡Best Seller!"
  },
  {
    id: 2,
    title: "Ensalada",
    subtitle: "Caesar",
    description: "Frescura y sabor en cada bocado.",
    ingredients: [
      "Lechuga fresca y crujiente",
      "Pollo a la parrilla jugoso",
      "Aderezo Caesar casero"
    ],
    image: "pollo-feliz/ensalada_4",
    fallbackImage: "pollo-feliz/ensalada_fresca",
    badge: "🥗 Fresh"
  },
  {
    id: 3,
    title: "Ensalada",
    subtitle: "Premium",
    description: "Fresca, saludable y llena de sabor.",
    ingredients: [
      "Lechugas frescas y crujientes",
      "Verduras del día recién cortadas",
      "Crutones dorados artesanales"
    ],
    image: "pollo-feliz/ensalada_5",
    fallbackImage: "pollo-feliz/ensalada_2",
    badge: "💚 Healthy"
  },
  {
    id: 4,
    title: "Hamburguesa",
    subtitle: "de Pollo",
    description: "Pollo empanizado crujiente con papas doradas.",
    ingredients: [
      "Pollo empanizado jugoso y crujiente",
      "Papas fritas perfectamente doradas",
      "Pan suave con ajonjolí"
    ],
    image: "pollo-feliz/hamburguesa",
    fallbackImage: "pollo-feliz/hamburguesa_1",
    badge: "🍔 Irresistible"
  },
  {
    id: 5,
    title: "Nuggets",
    subtitle: "Crujientes",
    description: "Los favoritos de toda la familia.",
    ingredients: [
      "Pollo premium en bocados perfectos",
      "Empanizado extra crujiente",
      "Porción generosa para compartir"
    ],
    image: "pollo-feliz/nuggets",
    fallbackImage: "pollo-feliz/nuggets",
    badge: "🍗 Kids Favorite"
  }
];

export default function CombinacionSlider() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
    startInterval();
  }, [isAnimating, startInterval]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
    startInterval();
  }, [isAnimating, startInterval]);

  const handleDotClick = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000);
    startInterval();
  }, [isAnimating, currentSlide, startInterval]);

  useEffect(() => {
    if (!mounted) return;
    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mounted, startInterval]);

  const slide = slides[currentSlide];

  if (!mounted) {
    return (
      <div className="grid md:grid-cols-2 gap-0 items-center min-h-[500px]">
        <div className="p-12 md:p-16 order-2 md:order-1 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-20 bg-gray-200 rounded-lg mb-4 w-64"></div>
            <div className="h-10 bg-gray-200 rounded-lg mb-4 w-48 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-full max-w-sm mx-auto"></div>
          </div>
        </div>
        <div className="order-1 md:order-2 h-[500px] bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">
      {/* Contenido izquierdo - Responsivo */}
      <div className="p-6 sm:p-8 md:p-12 lg:p-16 order-2 lg:order-1 flex flex-col items-center text-center">
        
        {/* Contenido del slide */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-6 sm:mb-8 w-full">
          {/* Título principal - Responsivo */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none drop-shadow-2xl text-white">
            {slide.title}
          </h2>
          
          {/* Subtítulo - Responsivo */}
          <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg text-white">
            {slide.subtitle}
          </h3>
          
          {/* Descripción - Responsivo */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed font-medium drop-shadow-lg text-white px-4">
            {slide.description}
          </p>
          
          {/* Ingredientes - Responsivo */}
          <div className="bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-100 dark:from-orange-900/30 dark:via-yellow-900/20 dark:to-orange-900/30 p-4 sm:p-6 rounded-2xl shadow-xl border-2 border-orange-300 dark:border-orange-700 w-full max-w-lg mx-auto">
            <ul className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed space-y-1.5 sm:space-y-2 text-black">
              {slide.ingredients.map((ingredient, index) => (
                <li key={index} className="break-words">🍗 {ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Indicadores de diapositivas - Responsivo */}
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
          {Array.from({ length: slides.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 sm:w-12 h-3 sm:h-4 bg-red-600 shadow-lg'
                  : 'w-3 sm:w-4 h-3 sm:h-4 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Botón CTA - Responsivo */}
        <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm px-4">
          <a href="https://wa.me/5218181234567" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="group bg-green-500 hover:bg-green-600 text-black w-full px-6 sm:px-10 py-4 sm:py-5 rounded-full font-extrabold text-base sm:text-xl shadow-2xl hover:shadow-green-500/70 transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 flex items-center justify-center gap-3 sm:gap-4 border-2 sm:border-4 border-black">
              <img 
                src="https://img.icons8.com/?size=100&id=BkugfgmBwtEI&format=png&color=000000" 
                alt="WhatsApp" 
                width="36"
                height="36"
                className="w-9 h-9 sm:w-12 sm:h-12 flex-shrink-0 group-hover:rotate-12 transition-transform"
              />
              <span className="whitespace-nowrap">¡Ordenar Ahora!</span>
            </button>
          </a>
        </div>
      </div>

      {/* Imagen del platillo con navegación - Responsivo */}
      <div className="order-1 lg:order-2 relative h-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden group">
        {/* Overlay decorativo */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-orange-600/20 to-orange-600/40 z-10"></div>
        
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 via-transparent to-red-600/10 z-10 animate-pulse"></div>
        
        {/* Imagen con animación - Responsivo */}
        <div 
          className="relative h-full w-full transform hover:scale-105 transition-transform duration-700 flex items-center justify-center"
        >
          <PromoImage 
            src={slide.image}
            alt={`${slide.title} ${slide.subtitle}`}
            fallbackSrc={slide.fallbackImage}
            width={1200}
            height={800}
            priority={currentSlide === 0}
          />
        </div>

        {/* Botones de navegación - Responsivo */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black p-2 sm:p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 opacity-70 sm:opacity-0 group-hover:opacity-100 disabled:opacity-30 touch-manipulation"
          aria-label="Anterior"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black p-2 sm:p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 opacity-70 sm:opacity-0 group-hover:opacity-100 disabled:opacity-30 touch-manipulation"
          aria-label="Siguiente"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Badge flotante - Responsivo */}
        <div 
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 bg-yellow-400 text-red-900 px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm md:text-base lg:text-lg shadow-2xl z-20 animate-bounce"
        >
          {slide.badge}
        </div>
      </div>
    </div>
  );
}
