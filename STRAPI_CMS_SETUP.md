# Guía de Configuración de Strapi CMS con Next.js

## 📋 Resumen

Este proyecto integra **Strapi v5** como CMS headless con **Next.js** para gestionar contenido del menú de manera dinámica. Los usuarios no técnicos pueden editar textos e imágenes desde el panel de administración de Strapi, y los cambios se reflejan automáticamente en la página principal.

## 🚀 Configuración Inicial

### 1. Configurar Variables de Entorno

#### Backend (Strapi) - `cms/.env`

```env
HOST=0.0.0.0
PORT=1337

# Secrets (Generar con: `openssl rand -base64 32`)
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
TRANSFER_TOKEN_SALT=toBeModified
JWT_SECRET=toBeModified

# Database (SQLite para desarrollo, PostgreSQL para producción)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Cloudinary Configuration
CLOUDINARY_NAME=tu-cloud-name
CLOUDINARY_KEY=tu-api-key
CLOUDINARY_SECRET=tu-api-secret
```

#### Frontend (Next.js) - `.env.local`

```env
# Strapi API Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=

# Revalidation secret
REVALIDATION_SECRET=your-secret-key-change-in-production
```

### 2. Instalar Dependencias y Ejecutar

```bash
# Backend - Strapi CMS
cd cms
npm install
npm run develop

# Frontend - Next.js (en otra terminal)
cd ..
npm install
npm run dev
```

## 🎯 Configuración del Panel Admin de Strapi

### 1. Crear Usuario Admin

1. Abre http://localhost:1337/admin
2. Completa el formulario de registro (primera vez)
3. Guarda las credenciales de forma segura

### 2. Configurar Permisos Públicos

Para permitir que Next.js acceda a los datos del menú:

1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click en **Public**
3. En **Permissions** → **Menu**:
   - ✅ `find` (lista todos los items)
   - ✅ `findOne` (obtener item individual)
4. Click en **Save**

### 3. Crear Items del Menú

1. Ve a **Content Manager** → **Menu**
2. Click en **Create new entry**
3. Completa los campos:
   - **Title**: Nombre del platillo
   - **Description**: Descripción (con formato rich text)
   - **Image**: Subir imagen (se almacena en Cloudinary)
   - **Order**: Orden de visualización (número)
   - **Slug**: Se genera automáticamente del título
4. Click en **Save** y luego **Publish**

## 🖼️ Integración con Cloudinary

Las imágenes se suben directamente desde el panel de Strapi y se almacenan en Cloudinary automáticamente.

### Configuración de Cloudinary

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/)
2. Obtén tus credenciales del Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Agrégalas al archivo `cms/.env`

## 🔄 Actualización Automática de Contenido

### Estrategias Implementadas

1. **ISR (Incremental Static Regeneration)**
   - Los datos se revalidan cada 60 segundos automáticamente
   - Configurado en `src/lib/strapi.ts`

2. **On-Demand Revalidation** (Opcional)
   - Endpoint: `/api/revalidate?secret=YOUR_SECRET&path=/menu-cms`
   - Permite revalidar instantáneamente cuando se publica contenido

### Configurar Webhook en Strapi (Opcional)

Para revalidación instantánea al publicar:

1. En Strapi Admin: **Settings** → **Webhooks** → **Create new webhook**
2. Configuración:
   - **Name**: Next.js Revalidation
   - **URL**: `https://tu-dominio.com/api/revalidate?secret=YOUR_SECRET&path=/menu-cms`
   - **Events**: 
     - ✅ `entry.publish` (Menu)
     - ✅ `entry.update` (Menu)
     - ✅ `entry.delete` (Menu)
3. Click en **Save**

## 📱 Uso en Frontend

### Páginas Disponibles

1. **Server Component (SSR/ISR)** - Recomendado
   - Ruta: `/menu-cms`
   - Archivo: `src/app/menu-cms/page.tsx`
   - Ventajas: SEO optimizado, automático, más rápido

2. **Client Component**
   - Componente: `src/app/componentes/MenuFromCMS.tsx`
   - Uso: Importar donde se necesite
   - Ventajas: Interactividad, actualizaciones en tiempo real

### Ejemplo de Uso

```tsx
// En cualquier página de Next.js
import { getMenuItems } from '@/lib/strapi';

export default async function MiPagina() {
  const menuItems = await getMenuItems();
  
  return (
    <div>
      {menuItems.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <img src={item.image.url} alt={item.title} />
          <div dangerouslySetInnerHTML={{ __html: item.description }} />
        </div>
      ))}
    </div>
  );
}
```

## 🔐 Seguridad

### ✅ Implementado

- Cloudinary keys solo en backend (cms/.env)
- CORS configurado en Strapi
- Content Security Policy actualizado para Cloudinary
- Permisos públicos limitados a lectura (find, findOne)

### ⚠️ Recomendaciones para Producción

1. **Generar Secrets Fuertes**
   ```bash
   # Linux/Mac
   openssl rand -base64 32
   
   # Windows (PowerShell)
   [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
   ```

2. **Usar PostgreSQL en Producción**
   ```env
   DATABASE_CLIENT=postgres
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

3. **API Token para Next.js** (Opcional pero recomendado)
   - En Strapi: **Settings** → **API Tokens** → **Create new API Token**
   - Type: Read-only
   - Duration: Unlimited
   - Agregar en `.env.local`: `STRAPI_API_TOKEN=tu-token`

## 🎨 Personalización

### Agregar Nuevos Campos al Menú

1. En Strapi Admin: **Content-Type Builder** → **Menu**
2. Click en **Add another field**
3. Selecciona el tipo de campo (Text, Number, Media, etc.)
4. Configura el campo y **Save**
5. Reinicia Strapi: `npm run develop`

### Actualizar TypeScript Types

Modifica `src/lib/strapi.ts` para reflejar nuevos campos:

```typescript
export interface MenuItem {
  // ... campos existentes
  price?: number; // Ejemplo: nuevo campo
  category?: string;
}
```

## 📊 Estructura de Archivos Creados

```
pollofelizdgo/
├── cms/                              # Backend Strapi
│   ├── .env                         # Variables de entorno Strapi
│   ├── config/
│   │   ├── plugins.ts               # Configuración Cloudinary
│   │   └── middlewares.ts           # CSP para Cloudinary
│   └── src/api/menu/                # Collection Type Menu
│       ├── content-types/menu/schema.json
│       ├── controllers/menu.ts
│       ├── routes/menu.ts
│       └── services/menu.ts
│
├── src/                             # Frontend Next.js
│   ├── app/
│   │   ├── api/revalidate/route.ts # API de revalidación
│   │   ├── menu-cms/page.tsx       # Página de menú (SSR)
│   │   └── componentes/MenuFromCMS.tsx # Componente cliente
│   └── lib/strapi.ts                # Cliente API Strapi
│
└── .env.local                       # Variables entorno Next.js
```

## 🐛 Troubleshooting

### Strapi no inicia

```bash
cd cms
rm -rf .cache build
npm run develop
```

### Imágenes no se muestran

1. Verifica Cloudinary keys en `cms/.env`
2. Revisa CSP en `cms/config/middlewares.ts`
3. Verifica permisos públicos en Strapi Admin

### Next.js no obtiene datos

1. Verifica que Strapi esté corriendo (http://localhost:1337)
2. Confirma permisos públicos configurados
3. Revisa `NEXT_PUBLIC_STRAPI_URL` en `.env.local`

## 📚 Recursos

- [Strapi Documentation](https://docs.strapi.io/)
- [Cloudinary Upload Provider](https://market.strapi.io/providers/@strapi-provider-upload-cloudinary)
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

---

✅ **Configuración completada exitosamente!**
