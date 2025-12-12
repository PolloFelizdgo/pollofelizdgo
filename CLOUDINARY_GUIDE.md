# Guía de Uso de Cloudinary

## ✅ Configuración Completada

Las credenciales de Cloudinary han sido configuradas:
- **Cloud Name**: dw55kbkmn
- **API Key**: 979973118959516
- **API Secret**: Configurado en .env.local

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
