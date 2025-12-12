# Estrategia de Manejo de Imágenes - Pollo Feliz

## 📁 Estructura de Carpetas

```
public/
├── imagenes/
│   ├── platillos/          # Imágenes de todos los platos del menú
│   ├── placeholder.svg     # Imagen por defecto para platillos
│   └── ...                 # Otras imágenes generales
├── sucursales/             # Logos/fotos de sucursales
│   └── placeholder.svg     # Imagen por defecto para sucursales
├── slider/                 # Imágenes del carrusel principal
└── videos/                 # Videos promocionales
```

## ✅ Componente OptimizedImage

**Ubicación:** `src/app/componentes/OptimizedImage.tsx`

### ¿Por qué usar OptimizedImage?

1. **Lazy Loading automático** - Imágenes se cargan cuando están visibles
2. **Optimización Next.js** - Convierte a WebP/AVIF automáticamente
3. **Fallback automático** - Si falla, muestra placeholder
4. **Responsive** - Adapta tamaños según dispositivo
5. **No más errores de componentes** - Reemplaza LazyImage

### Uso Básico

```tsx
import OptimizedImage from "@/app/componentes/OptimizedImage";

// Con width y height fijos
<OptimizedImage
  src="/imagenes/platillos/pollo_asado.jpg"
  alt="Pollo Asado"
  width={400}
  height={300}
  fallbackSrc="/imagenes/placeholder.svg"
/>

// Con fill (para contenedores con position: relative)
<OptimizedImage
  src="/sucursales/centro.svg"
  alt="Sucursal Centro"
  fill
  objectFit="contain"
  fallbackSrc="/sucursales/placeholder.svg"
/>

// Con priority (para imágenes above-the-fold)
<OptimizedImage
  src="/slider/hero-1.jpg"
  alt="Promoción"
  width={1920}
  height={800}
  priority
/>
```

## 🎯 Convenciones de Nombres

### Platillos
- **Formato:** `nombre_del_plato.jpg` o `.png`
- **Ejemplos:** `pollo_asado.jpg`, `ensalada_fresca.png`, `hamburguesa.png`
- **Ubicación:** `public/imagenes/platillos/`

### Sucursales
- **Formato:** `nombre_sucursal.svg` (preferir SVG para logos)
- **Ejemplos:** `centro.svg`, `norte.svg`, `jardines.svg`
- **Ubicación:** `public/sucursales/`

### Slider/Hero
- **Formato:** `hero-{numero}.jpg` o descriptivo
- **Ejemplos:** `hero-1.jpg`, `promo-noviembre.jpg`
- **Ubicación:** `public/slider/`

## 🚫 Qué NO Hacer

❌ **NO usar `<img>` directamente** - Usa `OptimizedImage`
❌ **NO crear componentes LazyImage custom** - Ya existe OptimizedImage
❌ **NO mezclar rutas** - Mantén cada tipo en su carpeta
❌ **NO imágenes sin fallback** - Siempre define `fallbackSrc`
❌ **NO olvidar alt text** - Importante para accesibilidad

## ✅ Qué SÍ Hacer

✅ Usa `OptimizedImage` para todas las imágenes
✅ Define `fallbackSrc` apropiado según categoría
✅ Usa `priority={true}` solo para imágenes visibles inmediatamente
✅ Nombra archivos descriptivamente en snake_case
✅ Incluye alt text descriptivo

## 🔧 Migración de Código Existente

### Antes (❌ Evitar)
```tsx
<img 
  src={image || "/placeholder.svg"} 
  alt={name}
  className="w-full h-auto"
/>
```

### Después (✅ Correcto)
```tsx
<OptimizedImage
  src={image || "/placeholder.svg"}
  alt={name}
  width={400}
  height={300}
  fallbackSrc="/placeholder.svg"
  className="w-full h-auto"
/>
```

## 📊 Ventajas de Esta Estrategia

1. **Performance**
   - Imágenes optimizadas automáticamente
   - Carga lazy por defecto
   - Formatos modernos (WebP, AVIF)

2. **Mantenibilidad**
   - Un solo componente para todas las imágenes
   - Fácil de actualizar globalmente
   - Estructura clara de carpetas

3. **Robustez**
   - Fallback automático si imagen falla
   - No más errores "Component is not defined"
   - Manejo de errores incorporado

4. **SEO**
   - Alt text obligatorio
   - Imágenes optimizadas = página más rápida
   - Mejor experiencia de usuario

## 🎨 Ejemplos por Sección

### MenuCard
```tsx
<OptimizedImage
  src={`/imagenes/platillos/${plato.imagen}`}
  alt={plato.nombre}
  width={350}
  height={250}
  fallbackSrc="/imagenes/placeholder.svg"
  objectFit="cover"
/>
```

### SucursalCard
```tsx
<OptimizedImage
  src={sucursal.image}
  alt={sucursal.name}
  fill
  objectFit="contain"
  fallbackSrc="/sucursales/placeholder.svg"
/>
```

### HeroCarousel
```tsx
<OptimizedImage
  src={slide.image}
  alt={slide.title}
  width={1920}
  height={800}
  priority={index === 0}
  quality={90}
  objectFit="cover"
/>
```

## 🐛 Solución de Problemas

### Error: "Component is not defined"
**Causa:** Caché del navegador o servidor
**Solución:**
1. Limpia caché: `Remove-Item -Recurse -Force .next, .turbo, node_modules\.cache`
2. Reinicia servidor
3. Limpia caché del navegador (Ctrl + Shift + Delete)

### Imagen no carga
**Causa:** Ruta incorrecta o archivo no existe
**Solución:**
1. Verifica que el archivo existe en `public/`
2. Revisa que la ruta no tenga `/public/` (Next.js lo agrega automáticamente)
3. Confirma que `fallbackSrc` es válido

### Imágenes muy pesadas
**Solución:**
1. Usa `quality={75}` para reducir tamaño
2. Define `sizes` para imágenes responsive
3. Considera convertir a WebP manualmente primero

## 📝 Checklist para Nuevas Imágenes

- [ ] Imagen guardada en carpeta correcta (`/imagenes/platillos`, `/sucursales`, etc.)
- [ ] Nombre descriptivo en snake_case
- [ ] Placeholder existe en la misma carpeta
- [ ] Componente usa `OptimizedImage`
- [ ] Definido `fallbackSrc` apropiado
- [ ] Alt text descriptivo incluido
- [ ] Width/height o fill especificado
- [ ] Priority solo si es above-the-fold

## 🚀 Comandos Útiles

```powershell
# Limpiar caché completo
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force .next, .turbo, node_modules\.cache, .swc

# Listar imágenes de platillos
Get-ChildItem public\imagenes\platillos

# Listar imágenes de sucursales
Get-ChildItem public\sucursales

# Encontrar uso de <img> en componentes (para migrar)
Get-ChildItem -Recurse -Filter "*.tsx" | Select-String -Pattern "<img"
```

---

**Última actualización:** 12 de Noviembre, 2025
**Mantenido por:** Equipo de desarrollo Pollo Feliz
