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
    image: "/imagenes/platillos/combinacion.jpg",
    fallbackImage: "/imagenes/PLATILLO COMPLETO.png",
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
    image: "/imagenes/ENSALADA 4.png",
    fallbackImage: "/imagenes/Ensalada_Fresca.png",
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
    image: "/imagenes/ENSALADA 5.png",
    fallbackImage: "/imagenes/ensalda 2.png",
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
    image: "/imagenes/HAMBURGUESA.png",
    fallbackImage: "/imagenes/HAMB1.png",
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
    image: "/imagenes/nuggets.png",
    fallbackImage: "/imagenes/nuggets.png",
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
    <div className="grid md:grid-cols-2 gap-0 items-center">
      {/* Contenido izquierdo */}
      <div className="p-12 md:p-16 order-2 md:order-1 flex flex-col items-center text-center">
        
        {/* Contenido del slide */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Título principal */}
          <h2 className="text-6xl md:text-7xl font-black text-red-700 tracking-tighter leading-none drop-shadow-2xl">
            {slide.title}
          </h2>
          
          {/* Subtítulo */}
          <h3 className="text-4xl md:text-5xl font-bold text-orange-600 drop-shadow-lg">
            {slide.subtitle}
          </h3>
          
          {/* Descripción */}
          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 max-w-2xl leading-relaxed font-medium">
            {slide.description}
          </p>
          
          {/* Ingredientes */}
          <div className="bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-100 dark:from-orange-900/30 dark:via-yellow-900/20 dark:to-orange-900/30 p-6 rounded-2xl shadow-xl border-2 border-orange-300 dark:border-orange-700 w-full max-w-lg">
            <ul className="text-lg text-gray-700 dark:text-gray-300 font-semibold leading-relaxed space-y-2">
              {slide.ingredients.map((ingredient, index) => (
                <li key={index}>🍗 {ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Indicadores de diapositivas */}
        <div className="flex gap-3 mb-8">
          {Array.from({ length: slides.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-4 bg-red-600 shadow-lg'
                  : 'w-4 h-4 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Botones CTA */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {/* Botón WhatsApp principal */}
          <a href="https://wa.me/5218181234567" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="group bg-green-500 hover:bg-green-600 text-black w-full px-10 py-5 rounded-full font-extrabold text-xl shadow-2xl hover:shadow-green-500/70 transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-4 border-4 border-black">
              <img 
                src="https://img.icons8.com/?size=100&id=BkugfgmBwtEI&format=png&color=000000" 
                alt="WhatsApp" 
                width="48"
                height="48"
                className="flex-shrink-0 group-hover:rotate-12 transition-transform filter brightness-0 invert"
              />
              ¡Ordenar Ahora!
            </button>
          </a>
        </div>
      </div>

      {/* Imagen del platillo con navegación */}
      <div className="order-1 md:order-2 relative h-full min-h-[500px] overflow-hidden group">
        {/* Overlay decorativo */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-orange-600/20 to-orange-600/40 z-10"></div>
        
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 via-transparent to-red-600/10 z-10 animate-pulse"></div>
        
        {/* Imagen con animación */}
        <div 
          className="relative h-full transform hover:scale-105 transition-transform duration-700 flex items-center justify-center"
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

        {/* Botones de navegación */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100 disabled:opacity-50"
          aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100 disabled:opacity-50"
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Badge flotante con animación */}
        <div 
          className="absolute bottom-8 right-8 bg-yellow-400 text-red-900 px-6 py-3 rounded-2xl font-bold text-lg shadow-2xl z-20 animate-bounce"
        >
          {slide.badge}
        </div>
      </div>
    </div>
  );
}
