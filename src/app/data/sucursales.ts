import type { Sucursal } from "../../types";

// Shared sucursales data used by the Sucursales page and the map on the home page.
// Assets & images:
// - Main photos and thumbnails live in `/public/sucursales/`.
// - Best practice: upload optimized AVIF/WebP images sized for the thumbnail
//   (default thumbnails are 300×150) and name them using the slug pattern
//   (e.g. `fidel_velazquez.avif`). The generator script `scripts/generate-sucursales-thumbnails.js`
//   will create `thumb-<slug>.avif` and `thumb-<slug>.webp` automatically from static maps.
// - To change a sucursal photo, either replace the file in `/public/sucursales/` with
//   the same filename, or update the `image` field below to the new path.
export const SUCURSALES: Sucursal[] = [
  {
    name: "Pollo Feliz - Jardines",
    address: "Blvd. Francisco Villa 103, Jardines de Durango, 34200 Durango, Dgo.",
    lat: 24.0402437,
    lng: -104.6314165,
    phone: "618 129 3739",
    extension: "1004",
    // Horario actualizado: lunes a domingo de 12 pm a 6:30 pm
    hours: "Lunes a domingo de 12:00 pm a 6:30 pm",
      // Imagen principal de la sucursal.
      // Opciones:
      // - Usar una imagen local colocada en `public/sucursales/` o `public/imagenes/`.
      //   Ejemplo: "/sucursales/jardines.avif" o "/imagenes/pollo_asado.png".
      // - Usar una URL externa (por ejemplo, fotos alojadas en un CDN):
      //   "https://example.com/mi-foto.jpg". Si usas URL externa, asegúrate de
      //   que el dominio esté permitido en la configuración de tu CDN/CSP si aplica.
      // Aquí por defecto usamos fotos de la carpeta `public/imagenes/` (fotos de platillos)
      // tal como pediste — esto da un aspecto más apetitoso a las tarjetas.
      image: "/imagenes/pollo_asado.png",
  },
  {
    name: "Pollo Feliz - Pino Suárez",
    address: "Pino Suárez, Durango",
    lat: 24.0270665,
    lng: -104.6302519,
    phone: "618 129 3730",
    extension: "1002",
    hours: "Lunes a domingo de 12:00 pm a 6:30 pm",
    image: "/imagenes/PLATILLO COMPLETO.png",
  },
  {
    name: "Pollo Feliz - Fidel Velázquez",
    address: "Av Fidel Velázquez Sánchez 114, Fidel Velázquez, 34229 Durango, Dgo.",
    // Coordenadas exactas proporcionadas por el usuario
    lat: 24.062824119639668,
    lng: -104.60285883274452,
    // Mapa: usar zoom más cercano para esta sucursal
    mapZoom: 17,
    phone: "618 129 3730",
    extension: "1003",
    hours: "Lunes a domingo de 12:00 pm a 6:30 pm",
    image: "/imagenes/POLLO PLATO NEGRO.png",
  },
  {
    name: "Pollo Feliz - Domingo Arrieta",
    address: "Blvd. Domingo Arrieta 506, Villa Alegre, Durango",
    lat: 24.0285,
    lng: -104.6532,
    phone: "618 129 3730",
    extension: "1004",
    hours: "Lunes a domingo de 12:00 pm a 6:30 pm",
    image: "/imagenes/FOTO 2.png",
  },
  {
    name: "Pollo Feliz - Lomas",
    address: "Lomas, Durango",
    lat: 24.015363,
    lng: -104.6940048,
    phone: "618 129 3730",
    extension: "1005",
    hours: "Lunes a domingo de 12:00 pm a 6:30 pm",
    image: "/imagenes/PLATO NEGRO FOTO.png",
  },
  {
    name: "Pollo Feliz - SEP",
    address: "SEP, Durango",
    lat: 24.02032,
    lng: -104.65756,
    phone: "618 129 3730",
    extension: "1006",
    hours: "Lunes a domingo de 12:00 pm a 6:30 pm",
    image: "/imagenes/LO Pollo Feliz final SEP 1-01.png",
  },
  {
    name: "Pollo Feliz - Primo de Verdad",
    address: "Primo de Verdad 1000, Valle del Sur, 34120 Durango, Dgo.",
    // Coordinates updated per user request (Primo de Verdad)
    lat: 24.0025583,
    lng: -104.6816928,
    phone: "618 129 3730",
    extension: "1007",
    hours: "Lunes a domingo de 12:00 pm a 6:30 pm",
    image: "/imagenes/FOTO 1.png",
  },
];
