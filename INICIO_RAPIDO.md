# Scripts de Inicio - Pollo Feliz DGO

## 🚀 Inicio Rápido

### Windows (PowerShell)

#### 1. Iniciar Strapi CMS (Backend)
```powershell
cd cms
npm run develop
```
- Abre: http://localhost:1337/admin
- Primera vez: Crear cuenta admin

#### 2. Iniciar Next.js (Frontend) - Nueva Terminal
```powershell
npm run dev
```
- Abre: http://localhost:3000
- Página con CMS: http://localhost:3000/menu-cms

---

## ⚙️ Configuración Inicial (Primera Vez)

### 1. Instalar Dependencias

```powershell
# Backend Strapi
cd cms
npm install

# Frontend Next.js
cd ..
npm install
```

### 2. Configurar Variables de Entorno

#### cms/.env
```env
HOST=0.0.0.0
PORT=1337

# Generar keys con: [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
APP_KEYS=cambiar-en-produccion-1,cambiar-en-produccion-2
API_TOKEN_SALT=cambiar-en-produccion
ADMIN_JWT_SECRET=cambiar-en-produccion
TRANSFER_TOKEN_SALT=cambiar-en-produccion
JWT_SECRET=cambiar-en-produccion

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Cloudinary (obtener de https://cloudinary.com/console)
CLOUDINARY_NAME=tu-cloud-name
CLOUDINARY_KEY=tu-api-key
CLOUDINARY_SECRET=tu-api-secret
```

#### .env.local (raíz del proyecto)
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
REVALIDATION_SECRET=cambiar-en-produccion
```

### 3. Configurar Strapi Admin (Primera Vez)

1. Iniciar Strapi: `cd cms; npm run develop`
2. Abrir: http://localhost:1337/admin
3. Crear cuenta de administrador
4. **Configurar Permisos:**
   - Settings → Users & Permissions Plugin → Roles → Public
   - En Menu: marcar `find` y `findOne`
   - Save

### 4. Agregar Contenido

1. Content Manager → Menu → Create new entry
2. Llenar campos:
   - Title
   - Description (rich text)
   - Image (subir - se guarda en Cloudinary)
   - Order (número)
3. Save → Publish

---

## 🔄 Comandos Útiles

### Desarrollo
```powershell
# Strapi en modo desarrollo
cd cms
npm run develop

# Next.js en modo desarrollo
npm run dev

# Ver solo frontend
npm run dev

# Build para producción
npm run build
npm run start
```

### Strapi
```powershell
cd cms

# Desarrollo con auto-reload
npm run develop

# Producción
npm run build
npm run start

# Limpiar cache
Remove-Item -Recurse -Force .cache, build
```

### Base de Datos
```powershell
# SQLite está en cms/.tmp/data.db
# Para reset (CUIDADO - borra todo):
cd cms
Remove-Item -Recurse -Force .tmp
npm run develop
```

---

## 📁 Archivos Importantes

### Backend (Strapi)
- `cms/.env` - Configuración y secrets
- `cms/src/api/menu/` - Collection Type Menu
- `cms/config/plugins.ts` - Cloudinary config
- `cms/.tmp/data.db` - Base de datos SQLite

### Frontend (Next.js)
- `.env.local` - Variables de entorno
- `src/lib/strapi.ts` - Cliente API
- `src/app/menu-cms/page.tsx` - Página de menú
- `src/app/api/revalidate/route.ts` - Revalidación

---

## 🐛 Solución de Problemas

### Error: Strapi no inicia
```powershell
cd cms
Remove-Item -Recurse -Force .cache, build, node_modules
npm install
npm run develop
```

### Error: Puerto 1337 ocupado
```powershell
# Ver qué usa el puerto
netstat -ano | findstr :1337

# Matar proceso (cambiar PID)
taskkill /PID <numero> /F
```

### Error: Imágenes no cargan
1. Verificar Cloudinary keys en `cms/.env`
2. Verificar CSP en `cms/config/middlewares.ts`
3. Verificar permisos públicos en Strapi Admin

### Error: Next.js no obtiene datos
1. Verificar Strapi corriendo: http://localhost:1337
2. Verificar permisos públicos (Settings → Roles → Public → Menu)
3. Verificar `.env.local` → `NEXT_PUBLIC_STRAPI_URL`

---

## 📊 Flujo de Trabajo Normal

1. **Iniciar Backend:**
   ```powershell
   cd cms
   npm run develop
   ```

2. **Iniciar Frontend (nueva terminal):**
   ```powershell
   npm run dev
   ```

3. **Editar Contenido:**
   - Ir a http://localhost:1337/admin
   - Content Manager → Menu
   - Editar/Crear items
   - Save → Publish

4. **Ver Cambios:**
   - Ir a http://localhost:3000/menu-cms
   - Los cambios aparecen en máximo 60 segundos (ISR)

---

## 🚀 Despliegue a Producción

### Variables de Entorno Requeridas

#### Backend (Strapi)
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=<generar-nuevas-keys>
API_TOKEN_SALT=<generar>
ADMIN_JWT_SECRET=<generar>
TRANSFER_TOKEN_SALT=<generar>
JWT_SECRET=<generar>

DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://...

CLOUDINARY_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
```

#### Frontend (Next.js)
```env
NEXT_PUBLIC_STRAPI_URL=https://tu-cms.com
STRAPI_API_TOKEN=<crear-en-strapi-admin>
REVALIDATION_SECRET=<generar-nuevo>
```

### Generar Keys Seguras (PowerShell)
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

---

✅ **Para más información, consulta: STRAPI_CMS_SETUP.md**
