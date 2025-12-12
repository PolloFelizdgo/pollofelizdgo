"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type LogoProps = {
  /** CSS classes to apply to the image container. Default matches existing sizing. */
  imgClassName?: string;
  /** CSS classes to apply to the brand text. If set to "hidden", text won't be rendered at all. */
  textClassName?: string;
  /** Whether to show the text. Takes precedence over textClassName. */
  showText?: boolean;
};

/**
 * Logo component - Client component for consistent hydration
 *
 * Accepts optional className props so callers (for example the footer)
 * can easily override the image/text sizing without editing the file.
 * Usage:
 *   <Logo imgClassName="w-28 h-28" textClassName="text-2xl" />
 *   <Logo showText={false} /> // No text at all
 */
export default function Logo({
  imgClassName = "w-20 h-20",
  textClassName = "hidden md:inline-block ml-3 text-xl font-semibold text-gold",
  showText = true,
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center" aria-label="Ir al inicio">
      <div className={`relative ${imgClassName}`}>
        <Image 
          src="/logo.png" 
          alt="Pollo Feliz" 
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 80px, 80px"
        />
      </div>
      {/* Nombre de la marca (solo visible en pantallas md+) */}
      {showText && <span className={textClassName}>Pollo Feliz</span>}
    </Link>
  );
}
