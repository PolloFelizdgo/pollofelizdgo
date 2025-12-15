# 📖 Guía Completa de Gestión de Imágenes

## 🎯 Sistema Mejorado

Tu proyecto ahora tiene un sistema centralizado y optimizado para gestionar imágenes de Cloudinary. Esto hace que cambiar imágenes sea **súper fácil** y **rápido**.

---

## 🏗️ Arquitectura del Sistema

### 1. **Archivo Central de Imágenes** 
📁 `src/lib/cloudinary-images.ts`

Este archivo contiene:
- ✅ Todas las URLs de imágenes organizadas por categoría
- ✅ Funciones helper para generar URLs
- ✅ Presets de configuración (tamaños, calidad, etc.)

**Ventajas:**
- Cambiar una imagen = editar solo 1 línea
- No más buscar rutas en múltiples archivos
- Autocompletado inteligente en tu editor

### 2. **Componente Optimizado**
📁 `src/app/componentes/CloudinaryImage.tsx`

Características:
- ✅ Blur placeholder automático mientras carga
- ✅ Lazy loading por defecto (mejor rendimiento)
- ✅ Manejo de errores con UI de fallback
- ✅ Transiciones suaves
- ✅ Optimización automática (calidad, formato)

### 3. **Herramienta Interactiva**
📁 `scripts/manage-images.js`

Menú interactivo para:
- 📤 Subir nuevas imágenes
- 🔄 Actualizar imágenes existentes
- 📋 Ver todas las imágenes
- 🗑️ Eliminar imágenes
- 📁 Ver estructura de carpetas

---

## 🚀 Cómo Cambiar Imágenes del Menú

### Método 1: Usando la Herramienta Interactiva (RECOMENDADO)

```bash
# En la terminal:
node scripts/manage-images.js
```

**Pasos:**
1. Selecciona opción `1` (Subir nueva imagen) o `2` (Actualizar existente)
2. Ingresa la ruta de tu imagen
3. Selecciona la carpeta (platillos, productos, slider, otros)
4. Dale un nombre (ej: `pollo_asado`)
5. Selecciona la calidad de compresión
6. ¡Listo! La imagen se comprime y sube automáticamente

**Después de subir:**
- Actualiza `src/lib/cloudinary-images.ts` (el script te dice exactamente qué agregar)
- La imagen estará disponible en tu app automáticamente

### Método 2: Manual (Para usuarios avanzados)

#### Paso 1: Subir a Cloudinary
- Sube tu imagen a Cloudinary
- Organízala en la carpeta correcta (`pollo-feliz/platillos/`, `pollo-feliz/productos/`, etc.)
- Anota el nombre del archivo

#### Paso 2: Actualizar Configuración
Abre `src/lib/cloudinary-images.ts` y agrega/modifica:

```typescript
export const IMAGES = {
  platillos: {
    combinacion: 'platillos/combinacion',
    pollo_nuevo: 'platillos/pollo_nuevo',  // ← NUEVA IMAGEN
    // ... más imágenes
  },
  // ...
};
```

#### Paso 3: Usar en el Menú
Abre `src/app/data/platos.ts` y actualiza/agrega:

```typescript
export const PLATOS: Plato[] = [
  { 
    name: "Pollo Especial", 
    imageBase: getCloudinaryImage(IMAGES.platillos.pollo_nuevo),  // ← USA AQUÍ
    desc: "Nuevo pollo delicioso",
    price: 149,
    bestseller: true 
  },
  // ...
];
```

---

## 📝 Ejemplos Prácticos

### Ejemplo 1: Cambiar imagen de "Combinación"

```typescript
// En src/lib/cloudinary-images.ts
export const IMAGES = {
  platillos: {
    combinacion: 'platillos/nueva_combinacion',  // ← CAMBIAR AQUÍ
  }
};
```

**¡Ya está!** No necesitas tocar ningún otro archivo. Todos los lugares que usen `IMAGES.platillos.combinacion` se actualizan automáticamente.

### Ejemplo 2: Agregar nuevo platillo

```typescript
// 1. En src/lib/cloudinary-images.ts
export const IMAGES = {
  platillos: {
    // ... otros platillos
    tacos: 'platillos/tacos_pastor',  // ← AGREGAR AQUÍ
  }
};

// 2. En src/app/data/platos.ts
export const PLATOS: Plato[] = [
  // ... otros platos
  { 
    name: "Tacos al Pastor", 
    imageBase: getCloudinaryImage(IMAGES.platillos.tacos),  // ← USAR AQUÍ
    desc: "Deliciosos tacos con piña",
    price: 89,
    category: "Tacos"
  },
];
```

### Ejemplo 3: Usar imagen en cualquier componente

```tsx
import CloudinaryImage from '@/app/componentes/CloudinaryImage';
import { IMAGES, getCloudinaryImage } from '@/lib/cloudinary-images';

export default function MiComponente() {
  return (
    <CloudinaryImage
      src={getCloudinaryImage(IMAGES.platillos.combinacion)}
      alt="Pollo Combinación"
      width={400}
      height={300}
      priority  // Solo para imágenes críticas
    />
  );
}
```

---

## ⚡ Mejoras de Rendimiento Implementadas

### 1. **Preload de Imágenes Críticas**
Las imágenes importantes se precargan en `<head>`:
- Hero slider (primera imagen)
- Primera imagen del menú
- Mejor LCP (Largest Contentful Paint)

### 2. **Lazy Loading Inteligente**
- Imágenes fuera de vista se cargan solo al hacer scroll
- Reduce ancho de banda inicial
- Mejora tiempo de carga de la página

### 3. **Blur Placeholder**
- Muestra gradiente animado mientras carga
- Evita saltos de layout (CLS)
- Mejor experiencia visual

### 4. **Optimización Automática de Cloudinary**
- Formato automático (WebP en navegadores modernos, JPG en otros)
- Calidad automática según dispositivo
- Tamaño responsive según viewport

### 5. **Compresión Agresiva**
- PNG → JPEG conversion
- Reducción de 70-99% del tamaño
- Máximo 1920px de ancho
- Calidad ajustable (40-80)

---

## 🎨 Presets Disponibles

Usa estos presets en tus componentes:

```typescript
import { IMAGE_PRESETS } from '@/lib/cloudinary-images';

// Para cards de menú
<CloudinaryImage {...IMAGE_PRESETS.menuCard} src="..." alt="..." />

// Para carousel/slider
<CloudinaryImage {...IMAGE_PRESETS.slider} src="..." alt="..." />

// Para hero images
<CloudinaryImage {...IMAGE_PRESETS.hero} src="..." alt="..." />

// Para thumbnails
<CloudinaryImage {...IMAGE_PRESETS.thumbnail} src="..." alt="..." />
```

---

## 🔧 Solución de Problemas

### Imagen no aparece
1. Verifica que la imagen existe en Cloudinary:
   ```bash
   node scripts/manage-images.js
   # Selecciona opción 3: Ver todas las imágenes
   ```
2. Verifica el path en `src/lib/cloudinary-images.ts`
3. Verifica que uses `getCloudinaryImage()` al importar

### Imagen carga lento
1. Verifica que el tamaño no sea excesivo (máximo 1920px)
2. Usa `priority={true}` solo para imágenes críticas
3. Asegúrate que la compresión esté en 60-80

### Imagen se ve borrosa
1. Aumenta el valor de `quality` en el preset
2. Verifica que el tamaño de la imagen sea adecuado
3. Usa formato PNG para logos/iconos con transparencia

---

## 📊 Estructura de Carpetas Recomendada

```
pollo-feliz/
├── platillos/          # Piezas de pollo, combinaciones
│   ├── combinacion.jpg
│   ├── perfil.jpg
│   ├── cadera.jpg
│   └── ...
├── productos/          # Nuggets, hamburguesas, papas
│   ├── nuggets.jpg
│   ├── hamburguesa.jpg
│   └── ...
├── slider/            # Imágenes grandes para carousel
│   ├── combinacion_slider.jpg
│   └── ...
└── otros/            # QR, logos, misc
    └── qr-encuesta.jpg
```

---

## ✅ Checklist de Actualización

Cuando actualices imágenes:

- [ ] Subir imagen a Cloudinary (usar `manage-images.js`)
- [ ] Actualizar `src/lib/cloudinary-images.ts`
- [ ] Si es plato nuevo: actualizar `src/app/data/platos.ts`
- [ ] Probar en localhost (`pnpm dev`)
- [ ] Commit y push a GitHub
- [ ] Deploy a Vercel automáticamente

---

## 🎓 Tips Pro

1. **Nombres consistentes**: Usa snake_case (ej: `pollo_asado`, `tacos_pastor`)
2. **Organización**: Mantén carpetas separadas por tipo de contenido
3. **Calidad**: Usa 80 para hero images, 60 para thumbnails
4. **Formato**: PNG solo para logos con transparencia, JPEG para todo lo demás
5. **Tamaño**: Máximo 1920px de ancho (Cloudinary redimensiona automáticamente)
6. **Priority**: Solo usa `priority={true}` para imágenes above the fold

---

## 🚀 Próximos Pasos Recomendados

1. **Configurar Vercel**:
   - Agregar las variables de entorno de Cloudinary en Vercel
   - Deploy y verificar que las imágenes cargan correctamente

2. **Monitoreo**:
   - Usar Cloudinary Analytics para ver uso de ancho de banda
   - Verificar Core Web Vitals en Google Search Console

3. **Optimización continua**:
   - Revisar imágenes que no se usen y eliminarlas
   - Comprimir más agresivamente si el plan de Cloudinary se llena
   - Considerar lazy loading más agresivo si hay muchas imágenes

---

## 📞 Necesitas Ayuda?

Si tienes problemas:
1. Revisa esta guía
2. Verifica la consola del navegador (F12)
3. Usa `node scripts/manage-images.js` para diagnosticar
4. Verifica logs de Cloudinary en su dashboard

---

**¡Sistema optimizado y listo para usar! 🎉**
