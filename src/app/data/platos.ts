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
    imageBase: '/imagenes/menu-static/LO Pollo Feliz final SEP 1-01 (1).png',
    desc: "Promoción especial Combinación Nov25.", 
    price: 199.0, 
    category: "Promoción", 
    bestseller: true 
  },
  { 
    name: "Perfil Pollo", 
    imageBase: '/imagenes/menu-static/3.png',
    desc: "Presentación especial de nuestro pollo.", 
    price: 149.0, 
    category: "Promoción", 
    bestseller: true 
  },
  { 
    name: "Equipo Completo", 
    imageBase: '/imagenes/menu-static/3 (1).png',
    desc: "Pack familiar completo.", 
    price: 399.0, 
    category: "Promoción", 
    bestseller: true 
  },
  
  // ===== PIEZAS DE POLLO =====
  { 
    name: "Cadera", 
    imageBase: '/imagenes/menu-static/3 (1) - copia.png',
    desc: "Cadera de pollo jugosa.", 
    price: 69.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Pierna", 
    imageBase: '/imagenes/menu-static/3 (1) - copia - copia.png',
    desc: "Pierna de pollo dorada.", 
    price: 69.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Pechuga", 
    imageBase: '/imagenes/menu-static/ENSALADA 1.png',
    desc: "Pechuga de pollo tierna.", 
    price: 79.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Alas", 
    imageBase: '/imagenes/menu-static/PALOMITAS.png',
    desc: "Alitas crujientes.", 
    price: 89.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Medio Pollo", 
    imageBase: '/imagenes/menu-static/QUESADILLA.png',
    desc: "Medio pollo asado.", 
    price: 129.0, 
    category: "Pollo", 
    bestseller: true 
  },
  { 
    name: "Pollo Entero", 
    imageBase: '/imagenes/menu-static/RAJAS.png',
    desc: "Pollo completo asado.", 
    price: 229.0, 
    category: "Pollo", 
    bestseller: true 
  },
  
  // ===== COMPLEMENTOS =====
  { 
    name: "Nuggets", 
    imageBase: '/imagenes/menu-static/nuggets.png',
    desc: "Nuggets de pollo crujientes.", 
    price: 79.0, 
    category: "Complementos" 
  },
  { 
    name: "Hamburguesa", 
    imageBase: '/imagenes/menu-static/HAMBURGUESA.png',
    desc: "Hamburguesa de pollo jugosa.", 
    price: 89.0, 
    category: "Complementos" 
  },
  { 
    name: "Papas Fritas", 
    imageBase: '/imagenes/menu-static/PAPAS FRANC.png',
    desc: "Papas doradas y crujientes.", 
    price: 49.0, 
    category: "Acompañamientos", 
    bestseller: true 
  },
  { 
    name: "Refresco", 
    imageBase: '/imagenes/menu-static/CALDO (1).png',
    desc: "Bebida refrescante.", 
    price: 25.0, 
    category: "Bebidas" 
  },
  { 
    name: "Salsa", 
    imageBase: '/imagenes/menu-static/SALSA 1.png',
    desc: "Salsa casera picante.", 
    price: 15.0, 
    category: "Salsas" 
  },

  // ===== NUEVOS PLATILLOS / COMBOS =====
  { 
    name: "Combo Familiar", 
    imageBase: '/imagenes/menu-static/SALSA 2.png',
    desc: "Pollo, guarniciones y bebidas para 4-5 personas.", 
    price: 449.0, 
    category: "Promoción", 
    bestseller: true 
  },
  { 
    name: "Combo Pareja", 
    imageBase: '/imagenes/menu-static/PAPAS GAJO.png',
    desc: "Medio pollo, papas y dos bebidas.", 
    price: 249.0, 
    category: "Promoción" 
  },
  { 
    name: "Pechuga Light", 
    imageBase: '/imagenes/menu-static/papa asada.png',
    desc: "Pechuga asada con ensalada fresca.", 
    price: 109.0, 
    category: "Pollo" 
  },
  { 
    name: "Alitas BBQ", 
    imageBase: '/imagenes/menu-static/chiles.png',
    desc: "Alitas bañadas en salsa BBQ ahumada.", 
    price: 99.0, 
    category: "Pollo" 
  },
  { 
    name: "Papas con Queso", 
    imageBase: '/imagenes/menu-static/chiles (1).png',
    desc: "Papas doradas con mezcla de quesos.", 
    price: 69.0, 
    category: "Acompañamientos" 
  },
  { 
    name: "Agua Fresca", 
    imageBase: '/imagenes/menu-static/cebolla (1).png',
    desc: "Agua del día (horchata, jamaica o limón).", 
    price: 35.0, 
    category: "Bebidas" 
  },
  { 
    name: "Salsa Especial", 
    imageBase: '/imagenes/menu-static/CEBOLLOTA MORADA.png',
    desc: "Receta de la casa, más intensa y aromática.", 
    price: 20.0, 
    category: "Salsas" 
  },

  // ===== EXTENSIÓN PARA 30 PLATILLOS ESTÁTICOS =====
  { name: "Tostadas de Pollo", imageBase: '/imagenes/menu-static/SPAGUETTI (1).png', desc: "Tostadas crujientes con pollo deshebrado.", price: 79, category: "Acompañamientos" },
  { name: "Ensalada Fresca", imageBase: '/imagenes/menu-static/3.png', desc: "Mix de lechugas, jitomate y aderezo.", price: 69, category: "Acompañamientos" },
  { name: "Elote Asado", imageBase: '/imagenes/menu-static/3 (1).png', desc: "Elote a la parrilla con mantequilla.", price: 55, category: "Acompañamientos" },
  { name: "Guacamole", imageBase: '/imagenes/menu-static/3 (1) - copia.png', desc: "Aguacate fresco con pico de gallo.", price: 49, category: "Salsas" },
  { name: "Quesadillas", imageBase: '/imagenes/menu-static/QUESADILLA.png', desc: "Queso fundido en tortilla de maíz.", price: 59, category: "Acompañamientos" },
  { name: "Tacos Dorados", imageBase: '/imagenes/menu-static/RAJAS.png', desc: "Tacos crujientes de pollo.", price: 85, category: "Acompañamientos" },
  { name: "Arroz Rojo", imageBase: '/imagenes/menu-static/SALSA 1.png', desc: "Arroz estilo casero.", price: 39, category: "Acompañamientos" },
  { name: "Frijoles Charros", imageBase: '/imagenes/menu-static/SALSA 2.png', desc: "Frijoles con tocino y chorizo.", price: 49, category: "Acompañamientos" },
  { name: "Papas Gajo", imageBase: '/imagenes/menu-static/PAPAS GAJO.png', desc: "Papas sazonadas al horno.", price: 69, category: "Acompañamientos" },
  { name: "Aros de Cebolla", imageBase: '/imagenes/menu-static/papa asada.png', desc: "Aros crujientes empanizados.", price: 69, category: "Acompañamientos" },
  { name: "Costillas BBQ", imageBase: '/imagenes/menu-static/chiles.png', desc: "Costillas bañadas en salsa BBQ.", price: 189, category: "Promoción" },
  { name: "Pollo a la Parrilla", imageBase: '/imagenes/menu-static/chiles (1).png', desc: "Pechuga marinada a las brasas.", price: 129, category: "Pollo" },
  { name: "Boneless", imageBase: '/imagenes/menu-static/cebolla (1).png', desc: "Trozos sin hueso con salsa a elegir.", price: 119, category: "Pollo" },
  { name: "Hamburguesa Doble", imageBase: '/imagenes/menu-static/CEBOLLOTA MORADA.png', desc: "Doble carne de pollo, queso y tocino.", price: 139, category: "Complementos" },
  { name: "Wrap de Pollo", imageBase: '/imagenes/menu-static/LO Pollo Feliz final SEP 1-01 (1).png', desc: "Wrap con pollo asado y verduras.", price: 99, category: "Complementos" },
  { name: "Enchiladas Verdes", imageBase: '/imagenes/menu-static/ENSALADA 1.png', desc: "Enchiladas con pollo y salsa verde.", price: 109, category: "Complementos" },
  { name: "Chilaquiles Rojos", imageBase: '/imagenes/menu-static/PALOMITAS.png', desc: "Con pollo y queso fresco.", price: 99, category: "Complementos" },
  { name: "Molletes", imageBase: '/imagenes/menu-static/PAPAS FRANC.png', desc: "Pan con frijoles y queso gratinado.", price: 69, category: "Acompañamientos" },
  { name: "Café de Olla", imageBase: '/imagenes/menu-static/CALDO (1).png', desc: "Café con canela y piloncillo.", price: 35, category: "Bebidas" },
  { name: "Agua Mineral", imageBase: '/imagenes/menu-static/nuggets.png', desc: "Refrescante y burbujeante.", price: 25, category: "Bebidas" },
  { name: "Pastel de Elote", imageBase: '/imagenes/menu-static/HAMBURGUESA.png', desc: "Rebanada dulce de elote.", price: 59, category: "Complementos" },
  { name: "Flan Casero", imageBase: '/imagenes/menu-static/3 (1) - copia - copia.png', desc: "Flan de vainilla con caramelo.", price: 55, category: "Complementos" },
  { name: "Pay de Limón", imageBase: '/imagenes/menu-static/SPAGUETTI (1).png', desc: "Postre cremoso de limón.", price: 59, category: "Complementos" },
  { name: "Brownie", imageBase: '/imagenes/menu-static/3.png', desc: "Brownie de chocolate con nuez.", price: 59, category: "Complementos" },
  { name: "Malteada Vainilla", imageBase: '/imagenes/menu-static/3 (1).png', desc: "Malteada cremosa.", price: 69, category: "Bebidas" },
  { name: "Malteada Chocolate", imageBase: '/imagenes/menu-static/3 (1) - copia.png', desc: "Malteada con cacao.", price: 69, category: "Bebidas" },
  { name: "Limonada Mineral", imageBase: '/imagenes/menu-static/QUESADILLA.png', desc: "Limonada con burbujas.", price: 39, category: "Bebidas" },
  { name: "Naranjada", imageBase: '/imagenes/menu-static/RAJAS.png', desc: "Naranjada fresca.", price: 39, category: "Bebidas" },
  { name: "Té Helado", imageBase: '/imagenes/menu-static/SALSA 1.png', desc: "Té negro con limón.", price: 35, category: "Bebidas" },
  { name: "Atole de Vainilla", imageBase: '/imagenes/menu-static/SALSA 2.png', desc: "Atole caliente.", price: 35, category: "Bebidas" },
];
