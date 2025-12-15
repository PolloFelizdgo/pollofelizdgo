// Página: Inicio (src/app/page.tsx)
// Propósito: landing principal. Contiene hero, CTA, grid de platos y mapa de la sucursal.
import HomeClient from "./componentes/HomeClient";

export const metadata = {
  title: "Pollo Feliz Durango | El Mejor Pollo Asado de la Ciudad",
  description: "Pollo Feliz Durango - 22 años sirviendo el mejor pollo asado. 7 sucursales en Durango. Ordena ahora y disfruta del auténtico sabor casero.",
  keywords: "pollo asado durango, pollo feliz, restaurante durango, comida durango, pollo a la leña",
  openGraph: {
    title: "Pollo Feliz Durango | El Mejor Pollo Asado",
    description: "22 años deleitando a familias con el mejor pollo asado de Durango",
    type: "website",
    locale: "es_MX"
  }
};

export default function Home() {
  return <HomeClient />;
}
