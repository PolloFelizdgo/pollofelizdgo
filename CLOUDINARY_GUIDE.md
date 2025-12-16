# Guía de Uso de Cloudinary

## ✅ Configuración Completada

Las credenciales de Cloudinary han sido configuradas:
- **Cloud Name**: dw55kbkmn
- **API Key**: 133683185364827
- **API Secret**: d2j_u8BoTcpPrcbCNFA_-Y_ax9E

### 🔐 Variables de Entorno

Archivo `.env.local`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dw55kbkmn
CLOUDINARY_API_KEY=133683185364827
CLOUDINARY_API_SECRET=d2j_u8BoTcpPrcbCNFA_-Y_ax9E
NEXT_PUBLIC_ADMIN_PASSWORD=pollofeliz2025
```

### ✅ Verificar Configuración

Ejecuta este comando para verificar que todo está bien:
```bash
node scripts/verify-cloudinary.js
```

## 📦 Paquetes Instalados

```bash
pnpm add cloudinary next-cloudinary
```

## 🎯 Cómo Usar

### 1. Componente CloudinaryImage (Recomendado)

Para mostrar imágenes optimizadas:

```tsx
import CloudinaryImage from '@/app/componentes/CloudinaryImage';

// En tu componente
<CloudinaryImage 
  src="pollo_asado"  // Nombre de la imagen en Cloudinary (sin extensión)
  alt="Pollo asado delicioso"
  width={800}
  height={600}
  className="rounded-lg"
  priority={false}
/>
```

### 2. API para Subir Imágenes

**Endpoint**: `POST /api/cloudinary`

```tsx
const formData = new FormData();
formData.append('file', imageFile);
formData.append('folder', 'pollo-feliz/platillos');

const response = await fetch('/api/cloudinary', {
  method: 'POST',
  body: formData
});

const data = await response.json();
// data.data.secure_url = URL de la imagen subida
```

### 3. API para Obtener Imágenes

**Endpoint**: `GET /api/cloudinary?folder=pollo-feliz`

```tsx
const response = await fetch('/api/cloudinary?folder=pollo-feliz/platillos');
const data = await response.json();
// data.images = Array de todas las imágenes
```

## 📁 Organización Sugerida en Cloudinary

```
pollo-feliz/
├── platillos/
│   ├── pollo_asado
│   ├── tacos
│   ├── ensalada
├── sucursales/
│   ├── centro
│   ├── norte
├── slider/
│   ├── combinacion
│   ├── perfil
└── logos/
    └── logo_principal
```

## 🔄 Subir Imágenes Existentes a Cloudinary

### Opción 1: Por Dashboard (Más Fácil)
1. Ve a https://console.cloudinary.com/console/dw55kbkmn/media_library
2. Click en "Upload"
3. Arrastra todas tus imágenes
4. Organízalas en carpetas

### Opción 2: Script de Subida Masiva

Crea `scripts/upload-to-cloudinary.js`:

```javascript
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dw55kbkmn',
  api_key: '979973118959516',
  api_secret: 'LPS1NIEDqfe25uErHaj3py0WYN0'
});

const uploadDir = path.join(__dirname, '../public/imagenes');

fs.readdirSync(uploadDir).forEach(async (file) => {
  if (file.match(/\.(jpg|jpeg|png)$/i)) {
    const filePath = path.join(uploadDir, file);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'pollo-feliz/platillos',
        use_filename: true,
        unique_filename: false
      });
      console.log(`✅ Subido: ${file} -> ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Error con ${file}:`, error);
    }
  }
});
```

Ejecutar: `node scripts/upload-to-cloudinary.js`

## 🎨 Transformaciones Automáticas

Las imágenes se optimizan automáticamente:
- **quality="auto"**: Calidad óptima según el ancho de banda
- **format="auto"**: WebP en navegadores compatibles, fallback a JPG/PNG
- **crop="fill"**: Recorte inteligente
- **gravity="auto"**: Enfoque en la parte más importante de la imagen

## 🌐 URLs de Ejemplo

Una vez subida, tus imágenes tendrán URLs como:
```
https://res.cloudinary.com/dw55kbkmn/image/upload/v1234567890/pollo-feliz/platillos/pollo_asado.jpg
```

Versiones optimizadas:
```
https://res.cloudinary.com/dw55kbkmn/image/upload/w_800,q_auto,f_auto/pollo-feliz/platillos/pollo_asado.jpg
```

## 🔐 Seguridad

- Las credenciales están en `.env.local` (NO se suben a Git)
- En producción, configura las mismas variables en Vercel:
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dw55kbkmn`
  - `CLOUDINARY_API_KEY=979973118959516`
  - `CLOUDINARY_API_SECRET=LPS1NIEDqfe25uErHaj3py0WYN0`

## 📊 Límites del Plan Gratuito

- ✅ 25 GB de almacenamiento
- ✅ 25 GB de ancho de banda mensual
- ✅ Transformaciones ilimitadas
- ✅ Suficiente para tu sitio web

## 🚀 Próximos Pasos

1. **Subir todas las imágenes** usando el dashboard o script
2. **Actualizar componentes** para usar `CloudinaryImage`
3. **Eliminar imágenes locales** una vez confirmado que funcionan
4. **Configurar en Vercel** las variables de entorno

---

## 🐛 Solución de Problemas

### Error: "Must supply api_key"

**Causa**: Las variables de entorno no están cargadas correctamente.

**Soluciones**:
1. Verifica que `.env.local` existe y tiene las 3 variables
2. Reinicia el servidor: `Ctrl+C` y luego `pnpm dev`
3. Ejecuta: `node scripts/verify-cloudinary.js`
4. Verifica que no hay espacios extra en las variables

### Error: "Invalid API Key" o 401

**Causa**: Las credenciales son incorrectas.

**Soluciones**:
1. Verifica en https://cloudinary.com/console que las credenciales son correctas
2. Copia y pega directamente desde el dashboard (sin espacios)
3. Verifica que no haya saltos de línea en el API Secret
4. Reinicia el servidor después de cambiar

### Error: "Error de conexión" o "Network error"

**Causa**: Problemas de red o firewall.

**Soluciones**:
1. Verifica tu conexión a internet
2. Intenta desde otra red (móvil, otra WiFi)
3. Desactiva VPN si tienes una activa
4. Verifica que tu firewall no bloquea api.cloudinary.com

### Error: "Timeout" al subir imagen

**Causa**: Imagen muy grande o conexión lenta.

**Soluciones**:
1. Reduce el tamaño de la imagen antes de subir
2. Usa formato WEBP o JPG (no PNG para fotos)
3. El límite actual es 50MB pero recomendado < 5MB
4. Comprime la imagen: https://tinypng.com

### La imagen no se muestra después de subir

**Causa**: Path incorrecto o imagen no procesada.

**Soluciones**:
1. Verifica que el `cloudinaryPath` en el JSON es correcto
2. Espera unos segundos (Cloudinary procesa la imagen)
3. Intenta refrescar la página con Ctrl+F5
4. Verifica en https://cloudinary.com/console que la imagen existe

---

## 💡 Mejores Prácticas

### 1. Tamaño de Imágenes

**Recomendaciones**:
- **Menú/Productos**: 800x600px, < 500KB
- **Sliders**: 1920x1080px, < 1MB
- **Galería**: 1200x900px, < 800KB
- **Thumbnails**: 400x300px, < 200KB

**Formato ideal**:
- Fotos: WEBP o JPG (85% calidad)
- Logos/íconos: PNG transparente
- Evita PNG para fotos (muy pesado)

### 2. Nombres de Archivo

✅ **Bueno**: `pollo-asado-especial.jpg`
❌ **Malo**: `IMG_20250101_123456.jpg`

**Consejos**:
- Usa guiones, no espacios
- Nombres descriptivos y en minúsculas
- Sin caracteres especiales (ñ, á, etc.)

### 3. Organización de Carpetas

```
pollo-feliz/
├── menu/          # Productos del menú
├── slider/        # Imágenes del carrusel
├── sucursales/    # Fotos de sucursales
├── galeria/       # Galería general
└── promociones/   # Ofertas y promociones
```

### 4. Validación Antes de Subir

**Checklist**:
- [ ] Tamaño < 50MB (recomendado < 5MB)
- [ ] Formato: JPG, PNG o WEBP
- [ ] Nombre descriptivo
- [ ] Imagen comprimida
- [ ] Preview correcto

### 5. Monitoreo de Uso

**Revisa mensualmente**:
1. Ve a: https://cloudinary.com/console
2. Verifica el uso de almacenamiento
3. Verifica el ancho de banda
4. Elimina imágenes no usadas

**Plan gratuito**:
- 25 GB almacenamiento (suficiente para ~5000 imágenes optimizadas)
- 25 GB bandwidth/mes (suficiente para ~100k visitas)

### 6. Optimización Automática

El sistema ya aplica estas optimizaciones:
- ✅ Formato automático (WEBP cuando el navegador lo soporta)
- ✅ Calidad automática (ajusta según contenido)
- ✅ Redimensionado (máximo 1200x900 para menú)
- ✅ Lazy loading (carga solo cuando se ve)

### 7. Testing en Producción

Antes de lanzar:
1. Sube 3-5 imágenes de prueba
2. Verifica que se ven en desarrollo
3. Deploy a Vercel
4. Configura variables en Vercel
5. Verifica que se ven en producción
6. Sube el resto de imágenes

---

## 🔄 Proceso Recomendado para Subir Imágenes

### Paso 1: Preparar Imágenes
```bash
# 1. Organiza tus imágenes localmente
# 2. Comprime si son muy grandes
# 3. Renombra con nombres descriptivos
```

### Paso 2: Subir desde Admin Panel
```
1. Ve a: http://localhost:3000/admin
2. Inicia sesión (pollofeliz2025)
3. Clic en "Nuevo Producto"
4. Arrastra y suelta la imagen
5. Completa el formulario
6. Guarda
```

### Paso 3: Verificar
```
1. Ve al menú público
2. Verifica que la imagen se ve correctamente
3. Revisa que carga rápido
4. Prueba en móvil
```

### Paso 4: Repetir
```
Sube de 5 a 10 productos a la vez
No subas todo de golpe
Verifica que cada batch funciona
```

---

## 📞 Soporte

**Si nada funciona**:
1. Ejecuta: `node scripts/verify-cloudinary.js`
2. Revisa la consola del navegador (F12)
3. Revisa los logs del servidor
4. Verifica en Cloudinary console que la cuenta está activa

**Recursos útiles**:
- Dashboard: https://cloudinary.com/console
- Documentación: https://cloudinary.com/documentation
- Límites: https://cloudinary.com/pricing

---

¡Cloudinary configurado y listo para usar! 🎉
