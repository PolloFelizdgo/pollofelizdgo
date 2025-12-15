# 📁 Nueva Estructura de Carpetas en Cloudinary

## ✅ Carpeta "menu" Creada

Se ha creado una nueva carpeta `pollo-feliz/menu/` en Cloudinary específicamente para las imágenes del menú.

### 📊 Estructura Actual

```
pollo-feliz/
├── menu/              ← NUEVA CARPETA (para menú de productos)
│   ├── combinacion.jpg
│   ├── combinacion_nov25.jpg
│   ├── perfil.jpg
│   ├── perfil_nov25.jpg
│   └── equipo.jpg
│
├── platillos/         (carpeta original)
│   ├── combinacion.jpg
│   ├── perfil.jpg
│   ├── equipo.jpg
│   ├── cadera.jpg
│   ├── pierna.jpg
│   ├── pechuga.jpg
│   ├── medio.jpg
│   ├── entero.jpg
│   └── alas.jpg
│
├── slider/            (imágenes para carousel)
│   ├── combinacion_slider.jpg
│   ├── perfil_slider.jpg
│   └── ...
│
├── productos/         (nuggets, hamburguesa, etc.)
└── otros/            (qr-encuesta, etc.)
```

## 🎯 Propósito de Cada Carpeta

### 1. **`menu/`** (NUEVA)
- **Uso**: Imágenes optimizadas para el menú de productos
- **Características**: 
  - Imágenes específicas para cards de menú
  - Tamaño optimizado para visualización en grid
  - Fácil de actualizar sin afectar otras secciones

### 2. **`platillos/`** (ORIGINAL)
- **Uso**: Imágenes generales de platillos
- **Características**:
  - Biblioteca completa de platos
  - Puede usarse en múltiples secciones
  - Mantiene las imágenes originales

### 3. **`slider/`**
- **Uso**: Imágenes para el carousel del home
- **Características**:
  - Resolución alta para hero section
  - Optimizadas para pantallas grandes

## 🔄 Cómo Usar la Nueva Carpeta

### En `src/lib/cloudinary-images.ts`:
```typescript
export const IMAGES = {
  menu: {
    combinacion: 'pollo-feliz/menu/combinacion',
    perfil: 'pollo-feliz/menu/perfil',
    equipo: 'pollo-feliz/menu/equipo',
  },
  // ...
};
```

### En `src/app/data/platos.ts`:
```typescript
export const PLATOS: Plato[] = [
  { 
    name: "Combinación Nov25", 
    imageBase: IMAGES.menu.combinacion_nov25,  // ← Usa carpeta menu
    desc: "Promoción especial",
    price: 199.0,
    bestseller: true 
  },
];
```

## 📤 Cómo Subir Nuevas Imágenes a la Carpeta Menu

### Método 1: Script Interactivo
```bash
node scripts/manage-images.js
# Selecciona opción 1: Subir nueva imagen
# Cuando pregunte por carpeta, selecciona "menu"
```

### Método 2: Script Automático
```bash
# Usar el script create-menu-folder.js como base
# Modificar para subir directamente a menu/
```

### Método 3: Manual en Cloudinary
1. Ve a https://cloudinary.com/console
2. Sube imagen a la carpeta `pollo-feliz/menu/`
3. Actualiza `cloudinary-images.ts`

## 🎨 Ventajas de Esta Estructura

✅ **Organización Clara**: Cada carpeta tiene un propósito específico
✅ **Fácil Mantenimiento**: Actualizar menú sin tocar otras imágenes
✅ **Mejor Rendimiento**: Imágenes optimizadas para cada uso
✅ **Escalabilidad**: Fácil agregar más categorías
✅ **Sin Duplicados**: Las imágenes originales se mantienen intactas

## 🔄 Migración Completa

Las imágenes del menú ahora usan la carpeta `menu/`:
- ✅ `IMAGES.menu.combinacion_nov25`
- ✅ `IMAGES.menu.perfil_nov25`
- ✅ `IMAGES.menu.equipo`

Las carpetas antiguas siguen disponibles por compatibilidad:
- 🔵 `IMAGES.platillos.*` (disponible)
- 🔵 `IMAGES.slider.*` (disponible)
- 🔵 `IMAGES.productos.*` (disponible)

## 📝 Próximos Pasos

1. **Subir más imágenes al menú**:
   ```bash
   node scripts/manage-images.js
   ```

2. **Actualizar platos.ts**:
   - Cambiar platos restantes para usar `IMAGES.menu.*`

3. **Optimizar imágenes existentes**:
   - Comprimir si es necesario
   - Asegurar tamaños consistentes

## 🎉 ¡Listo!

La carpeta `menu/` está creada y configurada. Todas las imágenes de platillos han sido copiadas y están listas para usar en el menú de productos.
