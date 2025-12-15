import { IMAGES } from '@/lib/cloudinary-images';

/**
 * TIPO DE PLATO
 * Define la estructura de cada platillo del menú
 */
export type Plato = {
  name: string;
  imageBase: string; // Path de Cloudinary (ej: "pollo-feliz/platillos/combinacion")
  desc?: string;
  category?: string;
  price?: number | null;
  bestseller?: boolean;
};

/**
 * LISTA DE PLATOS
 * 
 * CÓMO ACTUALIZAR IMÁGENES:
 * 1. Sube la imagen a Cloudinary en la carpeta correcta
 * 2. Actualiza el nombre en src/lib/cloudinary-images.ts en el objeto IMAGES
 * 3. Usa directamente IMAGES.categoria.nombre
 * 
 * EJEMPLO:
 * { 
 *   name: "Pollo Asado", 
 *   imageBase: IMAGES.platillos.combinacion,
 *   desc: "Delicioso pollo asado",
 *   price: 149,
 *   bestseller: true
 * }
 */
export const PLATOS: Plato[] = [
  // ===== COMBINACIONES Y PROMOCIONES =====
  { 
    name: "Combinación Nov25", 
    imageBase: IMAGES.menu.combinacion_nov25,
    desc: "Promoción especial Combinación Nov25.", 
    price: 199.0, 
    category: "Promoción", 
    bestseller: true 
  },
  { 
    name: "Perfil Pollo", 
    imageBase: IMAGES.menu.perfil_nov25,
    desc: "Presentación especial de nuestro pollo.", 
    price: 149.0, 
    category: "Promoción", 
    bestseller: true 
  },
  { 
    name: "Equipo Completo", 
    imageBase: IMAGES.menu.equipo,
    desc: "Pack familiar completo.", 
    price: 399.0, 
    category: "Promoción", 
    bestseller: true 
  },
  
  // ===== PIEZAS DE POLLO =====
  { 
    name: "Cadera", 
    imageBase: IMAGES.platillos.cadera,
    desc: "Cadera de pollo jugosa.", 
    price: 69.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Pierna", 
    imageBase: IMAGES.platillos.pierna,
    desc: "Pierna de pollo dorada.", 
    price: 69.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Pechuga", 
    imageBase: IMAGES.platillos.pechuga,
    desc: "Pechuga de pollo tierna.", 
    price: 79.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Alas", 
    imageBase: IMAGES.platillos.alas,
    desc: "Alitas crujientes.", 
    price: 89.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Medio Pollo", 
    imageBase: IMAGES.platillos.medio,
    desc: "Medio pollo asado.", 
    price: 129.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Pollo Entero", 
    imageBase: IMAGES.platillos.entero,
    desc: "Pollo completo asado.", 
    price: 229.0, 
    category: "Pollo", 
    bestseller: true 
  },
  
  // ===== COMPLEMENTOS =====
  { 
    name: "Nuggets", 
    imageBase: IMAGES.productos.nuggets,
    desc: "Nuggets de pollo crujientes.", 
    price: 79.0, 
    category: "Complementos" 
  },
  { 
    name: "Hamburguesa", 
    imageBase: IMAGES.productos.hamburguesa,
    desc: "Hamburguesa de pollo jugosa.", 
    price: 89.0, 
    category: "Complementos" 
  },
  { 
    name: "Papas Fritas", 
    imageBase: IMAGES.productos.papas,
    desc: "Papas doradas y crujientes.", 
    price: 49.0, 
    category: "Acompañamientos", 
    bestseller: true 
  },
  { 
    name: "Refresco", 
    imageBase: IMAGES.productos.refresco,
    desc: "Bebida refrescante.", 
    price: 25.0, 
    category: "Bebidas" 
  },
  { 
    name: "Salsa", 
    imageBase: IMAGES.productos.salsa,
    desc: "Salsa casera picante.", 
    price: 15.0, 
    category: "Salsas" 
  },
];
