"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  /** Base filename without extension, e.g. 'hero' will load /videos/hero.webm and /videos/hero.mp4 */
  srcBase?: string;
  /** Optional poster image path (relative to /public), e.g. '/images/hero-poster.jpg' */
  poster?: string;
  /** Whether native controls should be shown */
  controls?: boolean;
  /** Optional className to customize sizing */
  className?: string;
};

/**
 * Responsive, lazy-loading HTML5 Video Player
 * - Put video files in /public/videos/ (example: hero.webm + hero.mp4)
 * - This component waits for intersection before inserting <source> elements,
 *   which avoids even fetching metadata until the video is visible (better LCP).
 *
 * Usage examples:
 * <VideoPlayer />                          // uses default hero (hero.webm / hero.mp4)
 * <VideoPlayer srcBase="promo" poster="/images/promo.jpg" />
 */
export default function VideoPlayer({
  srcBase = "hero",
  poster = "/slider/pollo_feliz_1.svg",
  controls = true,
  className = "w-full rounded-md",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      // If no IntersectionObserver (old browsers), eagerly load
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "200px" } // preload a little before entering
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`video-player ${className}`}>
      {/*
        The <video> element is always rendered for accessibility, but we only
        include <source> elements when `visible` is true to avoid network
        requests until the user scrolls near the element.
      */}
      <video
        className="w-full h-auto aspect-video bg-black"
        poster={poster}
        preload={visible ? "metadata" : "none"}
        controls={controls}
        playsInline
        aria-label="Video"
      >
        {visible ? (
          // Preferred modern format first
          <>
            <source src={`/videos/${srcBase}.webm`} type="video/webm" />
            <source src={`/videos/${srcBase}.mp4`} type="video/mp4" />
          </>
        ) : null}
        {/* Fallback text */}
        Tu navegador no soporta el elemento de video. Puedes descargar el video desde el sitio.
      </video>
    </div>
  );
}
