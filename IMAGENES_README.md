# Gestión de Imágenes para Producción

## Problema Resuelto
Las imágenes PNG originales eran demasiado grandes (hasta 38MB cada una), excediendo el límite de 300MB de Vercel para funciones serverless.

## Solución Implementada
1. **Removidas del repositorio**: Todas las imágenes PNG/JPG grandes fueron eliminadas del tracking de Git
2. **APIs eliminadas**: Removidas `/api/images` y `/api/optimize-image` que no son críticas
3. **Única excepción**: `qr-encuesta.jpg` (necesario para la página)

## Opciones para Usar Imágenes en Producción

### Opción 1: Cloudinary (Recomendado) ⭐
**Gratis hasta 25GB de almacenamiento**

1. Crear cuenta en https://cloudinary.com
2. Subir todas las imágenes a Cloudinary
3. Usar las URLs de Cloudinary en el código:
```tsx
<img src="https://res.cloudinary.com/tu-cloud/image/upload/v1234/pollo_asado.jpg" />
```

### Opción 2: Vercel Blob Storage
**$0.15 por GB/mes**

```bash
npm install @vercel/blob
```

```tsx
import { put } from '@vercel/blob';

// Subir imagen
const blob = await put('pollo.jpg', file, { access: 'public' });
// Usar: blob.url
```

### Opción 3: Optimizar Localmente y Re-subir
Comprimir las imágenes con herramientas como:
- **TinyPNG**: https://tinypng.com (reduce 70% del tamaño)
- **Squoosh**: https://squoosh.app
- **ImageMagick**: `magick convert imagen.png -quality 85 -resize 1200x imagen.jpg`

Objetivo: Reducir cada imagen a menos de 500KB

## Archivos SVG (Conservados)
Los archivos SVG son ligeros y se mantuvieron:
- `/public/imagenes/*.svg`
- `/public/sucursales/*.svg`
- `/public/slider/*.svg`

## Para Desarrollo Local
Las imágenes originales siguen en tu disco local en `public/imagenes/` pero están en `.gitignore`, así que seguirán funcionando localmente.

## Próximos Pasos
1. Elegir un servicio de hosting de imágenes (Cloudinary recomendado)
2. Subir todas las imágenes optimizadas
3. Actualizar las rutas en los componentes que usan imágenes
