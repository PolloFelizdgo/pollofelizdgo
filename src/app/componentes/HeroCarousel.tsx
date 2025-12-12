"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

type Slide =
  | string
  | { src: string; alt?: string }
  | { type: "youtube"; id: string; title?: string };

const defaultSlides: Slide[] = [
  { type: "youtube", id: "FJtst-Flz94", title: "Pollo Feliz - Comercial" },
  { src: "pollo-feliz/slider/combinacion", alt: "Combinación perfecta" },
  { src: "pollo-feliz/slider/perfil", alt: "Perfil de Pollo Feliz" },
  "/slider/pollo_feliz_2.svg",
  "/slider/pollo_feliz_3.svg",
  "/slider/pollo_feliz_13.svg",
];

export default function HeroCarousel({ slides = defaultSlides, interval = 4000 }: { slides?: Slide[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const len = slides.length;
  const players = useRef<Record<number, HTMLIFrameElement | null>>({});
  const prevIndex = useRef<number>(0);
  const advanceTimeout = useRef<number | null>(null);
  const videoPlaying = useRef<boolean>(false);

  const clearPendingAdvance = useCallback(() => {
    if (advanceTimeout.current != null) {
      window.clearTimeout(advanceTimeout.current);
      advanceTimeout.current = null;
    }
  }, []);

  const step = useCallback(
    (delta: number) => {
      clearPendingAdvance();
      if (!len) return;
      setIndex((prev) => (prev + delta + len) % len);
    },
    [clearPendingAdvance, len]
  );

  const goTo = useCallback(
    (target: number) => {
      clearPendingAdvance();
      if (!len) return;
      const normalized = ((target % len) + len) % len;
      setIndex(normalized);
    },
    [clearPendingAdvance, len]
  );

  useEffect(() => {
    return () => {
      Object.values(players.current).forEach((frame) => {
        if (!frame) return;
        try {
          frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
        } catch (_e) {
          // ignore cross-origin errors
        }
      });
      players.current = {};
      clearPendingAdvance();
    };
  }, [clearPendingAdvance]);

  useEffect(() => {
    if (!len) return;
    const current = slides[index];
    const isYouTube = typeof current !== "string" && (current as any).type === "youtube";
    if (isYouTube) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % len);
    }, interval);

    return () => window.clearInterval(timer);
  }, [len, interval, index, slides]);

  const postPlayerCommand = useCallback((iframe: HTMLIFrameElement | null, command: "playVideo" | "pauseVideo") => {
    try {
      if (!iframe || !iframe.contentWindow) return;
      iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: command, args: [] }), "*");
    } catch (_e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const prev = prevIndex.current;
    if (prev !== index) {
      const prevPlayer = players.current[prev];
      const nextPlayer = players.current[index];
      if (prevPlayer) postPlayerCommand(prevPlayer, "pauseVideo");
      if (nextPlayer) postPlayerCommand(nextPlayer, "playVideo");
      const cur = slides[index];
      const isYouTube = typeof cur !== "string" && (cur as any).type === "youtube";
      videoPlaying.current = !!nextPlayer && isYouTube;
      prevIndex.current = index;
    }
  }, [index, slides, postPlayerCommand]);

  useEffect(() => {
    const handler = (ev: MessageEvent) => {
      let data = ev.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (_e) {
          return;
        }
      }
      if (!data || typeof data !== "object") return;

      if (data.event === "onStateChange" && typeof data.info === "number") {
        const curSlide = slides[index];
        const isYouTubeCur = typeof curSlide !== "string" && (curSlide as any).type === "youtube";
        if (isYouTubeCur) {
          videoPlaying.current = data.info === 1;
        }
        if (data.info === 0) {
          clearPendingAdvance();
          advanceTimeout.current = window.setTimeout(() => {
            setIndex((prev) => (prev + 1) % len);
            advanceTimeout.current = null;
          }, 800);
        }
      }
    };

    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
      clearPendingAdvance();
    };
  }, [len, slides, index, clearPendingAdvance]);

  useEffect(() => {
    const keyHandler = (ev: KeyboardEvent) => {
      if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
      const cur = slides[index];
      const isYouTube = typeof cur !== "string" && (cur as any).type === "youtube";

      if (ev.key === "Escape" || ev.key === "Esc" || ev.key === "k") {
        if (isYouTube) {
          ev.preventDefault();
          step(1);
        }
        return;
      }

      if (ev.key === " " || ev.code === "Space") {
        if (isYouTube) {
          ev.preventDefault();
          const player = players.current[index];
          if (!player) return;
          if (videoPlaying.current) {
            postPlayerCommand(player, "pauseVideo");
            videoPlaying.current = false;
          } else {
            postPlayerCommand(player, "playVideo");
            videoPlaying.current = true;
          }
        }
        return;
      }

      if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        step(-1);
        return;
      }
      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        step(1);
        return;
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [index, slides, step, postPlayerCommand]);

  useEffect(() => {
    clearPendingAdvance();
  }, [index, clearPendingAdvance]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-64 md:h-96">
        {slides.map((s, i) => {
          if (typeof s !== "string" && (s as any).type === "youtube") {
            const vid = s as { type: "youtube"; id: string; title?: string };
            const params = new URLSearchParams({ rel: "0", modestbranding: "1", enablejsapi: "1", mute: "1", autoplay: "1" });
            const embed = `https://www.youtube-nocookie.com/embed/${vid.id}?${params.toString()}`;

            return (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                aria-hidden={i === index ? "false" : "true"}
              >
                <iframe
                  ref={(el) => {
                    players.current[i] = el;
                  }}
                  src={embed}
                  title={vid.title || "Video"}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            );
          }

          const imageSlide =
            typeof s === "string"
              ? { src: s, alt: "slide" }
              : (s as { src: string; alt?: string });
          
          // Usa object-contain para combinacion para verla completa y más ancha
          const isCombiImage = imageSlide.src.includes("combinacion");
          const objectFit = isCombiImage ? "object-contain" : "object-cover";
          
          // Si es una imagen de Cloudinary (sin .svg y sin /), usa CldImage
          const isCloudinary = !imageSlide.src.endsWith('.svg') && !imageSlide.src.startsWith('/');
          
          return (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
              aria-hidden={i === index ? "false" : "true"}
            >
              <div className="absolute inset-0 bg-neutral-950">
                {isCloudinary ? (
                  <img 
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_1920,q_auto,f_auto/${imageSlide.src}`}
                    alt={imageSlide.alt || "slide"} 
                    className={`w-full h-full ${objectFit}`}
                  />
                ) : (
                  <img src={imageSlide.src} alt={imageSlide.alt || "slide"} className={`w-full h-full ${objectFit}`} />
                )}
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "var(--overlay)" }} />
            </div>
          );
        })}
      </div>

      <button
        aria-label="Anterior"
        onClick={() => step(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full md:left-6 z-30 pointer-events-auto"
        style={{ backgroundColor: "var(--dark)", color: "var(--gold)" }}
      >
        <span aria-hidden="true">&lsaquo;</span>
      </button>
      <button
        aria-label="Siguiente"
        onClick={() => step(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full md:right-6 z-30 pointer-events-auto"
        style={{ backgroundColor: "var(--dark)", color: "var(--gold)" }}
      >
        <span aria-hidden="true">&rsaquo;</span>
      </button>

      {(() => {
        const cur = slides[index];
        const isYouTube = typeof cur !== "string" && (cur as any).type === "youtube";
        if (!isYouTube) return null;
        return (
          <div className="absolute right-6 bottom-6 z-30">
            <button
              onClick={() => step(1)}
              title="Esc para saltar"
              className="bg-black/80 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2"
              aria-label="Saltar video"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4v16l11-8L5 4z" fill="currentColor" />
                <path d="M19 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="sr-only">Saltar video</span>
            </button>
          </div>
        );
      })()}

      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: i === index ? "var(--gold)" : "var(--gold-alpha)" }}
          />
        ))}
      </div>
    </div>
  );
}
