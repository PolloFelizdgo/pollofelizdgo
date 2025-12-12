// Tipos y datos de platillos
export type Plato = {
  name: string;
  // imageBase is the filename (without extension and without size suffix).
  // Example: imageBase: 'pollo_asado' -> files can be /imagenes/pollo_asado.jpg, /imagenes/pollo_asado-320.jpg, etc.
  imageBase: string;
  desc?: string;
  category?: string;
  price?: number | null;
  bestseller?: boolean;
};

/* PLATOS: agrega o edita platillos aquí. Para mejor rendimiento sube variantes de cada imagen usando la convención:
   <imageBase>-320.jpg, <imageBase>-640.jpg, <imageBase>-1024.jpg y/o <imageBase>.jpg
   El endpoint /api/images devolverá las variantes disponibles y el cliente usará srcset automáticamente. */
export const PLATOS: Plato[] = [
  // Imágenes ahora se cargan desde Cloudinary (pollo-feliz/platillos/)
  { name: "Pollo Feliz (Logo)", imageBase: "pollo-feliz/logos/logo_principal", desc: "Nuestro logotipo - sabor para sonreír.", price: 2650.0, category: "Especial", bestseller: true },
  { name: "Combinación Nov25", imageBase: "pollo-feliz/platillos/combinacion", desc: "Promoción especial Combinación Nov25.", price: 199.0, category: "Promoción", bestseller: true },
  { name: "Pollo Asado", imageBase: "pollo-feliz/platillos/pollo_asado", desc: "Pollo rostizado con especias caseras.", price: 149.0, category: "Pollo", bestseller: true },
  { name: "Ensalada Fresca", imageBase: "pollo-feliz/platillos/ensalada_fresca", desc: "Mezcla de hojas con aderezo cítrico.", price: 79.0, category: "Ensaladas", bestseller: true },
  { name: "Palomitas", imageBase: "pollo-feliz/platillos/palomitas", desc: "Palomitas de maíz crujientes.", price: 129.0, category: "Botanas", bestseller: true },
  { name: "Sopa de la Casa", imageBase: "pollo-feliz/platillos/sopa", desc: "Sopa casera con verduras frescas.", price: 69.0, category: "Sopas", bestseller: true },
  { name: "Papas Fritas", imageBase: "pollo-feliz/platillos/papas", desc: "Papas doradas y crujientes.", price: 49.0, category: "Acompañamientos", bestseller: true },
  { name: "Tacos al Pastor", imageBase: "pollo-feliz/platillos/tacos_pastor", desc: "Tacos con carne adobada y piña.", price: 99.0, category: "Tacos" },
  { name: "Burrito Especial", imageBase: "pollo-feliz/platillos/burrito", desc: "Burrito relleno de arroz, frijoles y carne.", price: 129.0, category: "Burritos" },
  { name: "Fajitas Mixtas", imageBase: "pollo-feliz/platillos/fajitas", desc: "Tiras de carne y verduras salteadas.", price: 179.0, category: "Pollo" },
  { name: "Quesadilla de Queso", imageBase: "pollo-feliz/platillos/quesadilla", desc: "Quesadilla gratinada con tres quesos.", price: 79.0, category: "Quesos" },
  { name: "Mole Poblano", imageBase: "pollo-feliz/platillos/mole", desc: "Pollo bañado en mole tradicional.", price: 159.0, category: "Pollo" },
  { name: "Chiles Rellenos", imageBase: "pollo-feliz/platillos/chiles_rellenos", desc: "Chiles poblanos rellenos y capeados.", price: 139.0, category: "Especiales" },
  { name: "Tamal de Pollo", imageBase: "pollo-feliz/platillos/tamal", desc: "Tamal casero con salsa verde.", price: 59.0, category: "Tradicional" },
  { name: "Elote Asado", imageBase: "pollo-feliz/platillos/elote", desc: "Elote preparado con mantequilla y queso.", price: 39.0, category: "Acompañamientos" },
  { name: "Pescado Frito", imageBase: "pollo-feliz/platillos/pescado_frito", desc: "Filete de pescado frito con limón.", price: 189.0, category: "Mariscos" },
  { name: "Camarones al Ajillo", imageBase: "pollo-feliz/platillos/camarones", desc: "Camarones salteados con ajo y mantequilla.", price: 199.0, category: "Mariscos" },
  { name: "Hamburguesa Clásica", imageBase: "pollo-feliz/platillos/hamburguesa", desc: "Carne jugosa con queso y vegetales.", price: 119.0, category: "Hamburguesas" },
  { name: "Nachos con Queso", imageBase: "pollo-feliz/platillos/nachos", desc: "Totopos con queso fundido y jalapeños.", price: 89.0, category: "Botanas" },
  { name: "Sopa de Mariscos", imageBase: "pollo-feliz/platillos/sopa_mariscos", desc: "Caldo con mezcla de mariscos frescos.", price: 159.0, category: "Sopas" },
  { name: "Pozole Rojo", imageBase: "pollo-feliz/platillos/pozole", desc: "Pozole tradicional con carne de cerdo.", price: 129.0, category: "Tradicional" },
  { name: "Ceviche de Camarón", imageBase: "pollo-feliz/platillos/ceviche", desc: "Camarón marinado con cítricos y cilantro.", price: 169.0, category: "Mariscos" },
];
