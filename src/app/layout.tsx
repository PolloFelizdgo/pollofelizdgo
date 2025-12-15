import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Leaflet global styles (required for map markers/tiles)
// Requires installing leaflet: npm install leaflet
import "leaflet/dist/leaflet.css";
import { NavbarClean as Navbar } from "./componentes/NavbarClean";
import Footer from "./componentes/footer";
import JotFormScript from "./componentes/JotFormScript";
import { IMAGES } from "@/lib/cloudinary-images";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Pollo Feliz Durango | Pollo Asado a la Leña",
    template: "%s | Pollo Feliz Durango"
  },
  description: "Pollo Feliz Durango - 22 años sirviendo el mejor pollo asado a la leña. 7 sucursales en Durango. Ordena ahora y disfruta del auténtico sabor casero.",
  keywords: ["pollo asado", "pollo feliz", "restaurante durango", "comida durango", "pollo a la leña", "pollo asado durango"],
  authors: [{ name: "Pollo Feliz Durango" }],
  creator: "Pollo Feliz Durango",
  publisher: "Pollo Feliz Durango",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://pollofelizdgo.com",
    siteName: "Pollo Feliz Durango",
    title: "Pollo Feliz Durango | El Mejor Pollo Asado",
    description: "22 años deleitando a familias con el mejor pollo asado de Durango",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pollo Feliz Durango",
    description: "El mejor pollo asado de Durango desde hace 22 años",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
      <html lang="es-MX">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          {/* Preconnect to Cloudinary for faster image loading */}
          <link rel="preconnect" href="https://res.cloudinary.com" />
          <link rel="dns-prefetch" href="https://res.cloudinary.com" />
          {/* Preload critical fonts (place WOFF2 files in /public/fonts/) */}
          <link rel="preload" href="/fonts/NEILVARD-One-Semibold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/Brignell-Square-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/Grignell-Square-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          {/* Preload critical images from Cloudinary for better LCP */}
          <link 
            rel="preload" 
            as="image" 
            href={`https://res.cloudinary.com/dw55kbkmn/image/upload/w_1200,f_auto,q_auto/${IMAGES.slider.combinacion}.jpg`}
          />
          <link 
            rel="preload" 
            as="image" 
            href={`https://res.cloudinary.com/dw55kbkmn/image/upload/w_400,f_auto,q_auto/${IMAGES.platillos.combinacion}.jpg`}
          />
        </head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
          
          <JotFormScript />
        </body>
      </html>
  
  );
}
