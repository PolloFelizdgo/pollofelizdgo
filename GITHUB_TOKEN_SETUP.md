# 🔑 Configuración de GitHub Token para Admin Panel

Para que el panel de administración funcione en producción (Vercel), necesitas configurar un **GitHub Personal Access Token** que permita actualizar el archivo `menu.json` automáticamente.

## 📋 Pasos para crear el token

### 1. Ir a GitHub Settings
1. Ve a tu perfil de GitHub: https://github.com/settings/tokens
2. O navega: **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**

### 2. Generar nuevo token
1. Click en **"Generate new token"** → **"Generate new token (classic)"**
2. Dale un nombre descriptivo: `Pollo Feliz Admin Panel`
3. Selecciona la duración: **90 days** o **No expiration** (recomendado)

### 3. Seleccionar permisos (scopes)
Marca **SOLO** estos permisos:
- ✅ **repo** (acceso completo a repositorios)
  - [x] repo:status
  - [x] repo_deployment
  - [x] public_repo
  - [x] repo:invite
  - [x] security_events

### 4. Generar y copiar el token
1. Click en **"Generate token"** al final de la página
2. **¡IMPORTANTE!** Copia el token inmediatamente (solo se muestra una vez)
3. Formato: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 🚀 Configurar en Vercel

### 1. Ir al dashboard de Vercel
1. Abre tu proyecto: https://vercel.com/pollofelizdgos-projects/pollofelizdgo
2. Ve a **Settings** → **Environment Variables**

### 2. Agregar variables de entorno
Agrega estas **3 variables** (una por una):

| Variable | Valor | Entorno |
|----------|-------|---------|
| `GITHUB_TOKEN` | `ghp_tu_token_aquí` | Production, Preview, Development |
| `GITHUB_OWNER` | `PolloFelizdgo` | Production, Preview, Development |
| `GITHUB_REPO` | `pollofelizdgo` | Production, Preview, Development |

**Pasos:**
1. Click **"Add New"**
2. Name: `GITHUB_TOKEN`
3. Value: Pega tu token (empieza con `ghp_`)
4. Environments: Marca **Production**, **Preview**, **Development**
5. Click **"Save"**
6. Repite para `GITHUB_OWNER` y `GITHUB_REPO`

### 3. Redesplegar
Después de agregar las variables:
1. Ve a **Deployments**
2. Click en el último deployment
3. Click en **⋯ (three dots)** → **Redeploy** → **Redeploy**

O desde tu terminal:
```bash
vercel --prod
```

---

## ✅ Verificar que funciona

### En localhost (.env.local)
Agrega las mismas variables en tu archivo `.env.local`:

```env
# GitHub API para admin panel
GITHUB_TOKEN=ghp_tu_token_aquí
GITHUB_OWNER=PolloFelizdgo
GITHUB_REPO=pollofelizdgo
GITHUB_BRANCH=main
```

### Probar en producción
1. Ve a tu admin panel: `https://tu-dominio.vercel.app/admin`
2. Password: `pollofeliz2025`
3. Edita un producto y guarda
4. Verifica que aparezca el mensaje: "Cambios guardados. Vercel desplegará automáticamente en ~2 minutos"
5. Espera 2-3 minutos y recarga la página principal

---

## 🔒 Seguridad del Token

### ✅ Buenas prácticas:
- **NO** compartas el token públicamente
- **NO** lo subas a GitHub (usa `.env.local` que está en `.gitignore`)
- Renueva el token cada 90 días si elegiste expiración
- Si el token se compromete, revócalo inmediatamente y genera uno nuevo

### Revocar un token:
1. Ve a https://github.com/settings/tokens
2. Encuentra tu token
3. Click **"Delete"**
4. Genera uno nuevo y actualiza Vercel

---

## 🛠️ Troubleshooting

### Error: "GITHUB_TOKEN no configurado"
- Verifica que agregaste la variable en Vercel
- Asegúrate de haber redeployado después de agregar las variables
- Revisa que el nombre sea exactamente `GITHUB_TOKEN` (case-sensitive)

### Error: "Error de GitHub: Bad credentials"
- El token es inválido o expiró
- Genera un nuevo token
- Verifica que copiaste el token completo (empieza con `ghp_`)

### Error: "Error de GitHub: Not Found"
- Verifica que `GITHUB_OWNER` y `GITHUB_REPO` sean correctos
- El repositorio debe ser `PolloFelizdgo/pollofelizdgo`

### Los cambios no se ven después de 2 minutos
- Ve a Vercel dashboard → Deployments
- Verifica que haya un nuevo deployment en progreso
- Revisa los logs del deployment para errores

---

## 📝 Notas adicionales

### ¿Cómo funciona?
1. **Localhost**: Usa git local → commit → push → Vercel detecta y redeploya
2. **Producción**: Admin usa GitHub API → actualiza menu.json → Vercel detecta y redeploya

### Workflow completo:
```
Admin Panel (Producción)
    ↓ edita producto
    ↓ click "Guardar"
API /api/menu
    ↓ usa GitHub API
GitHub Repository
    ↓ actualiza menu.json
    ↓ trigger webhook
Vercel
    ↓ detecta cambio
    ↓ redeploy automático (~2 min)
Sitio actualizado ✅
```

### Alternativas si no quieres usar GitHub Token:
1. **Usar base de datos** (PostgreSQL/MongoDB) - cambios instantáneos
2. **Editar solo desde localhost** - workflow actual sin token
3. **Vercel KV** (Redis) - configuración rápida

---

## 💬 ¿Necesitas ayuda?

Si tienes problemas configurando el token:
1. Revisa los logs en Vercel: **Deployments** → **Functions** → `/api/menu`
2. Verifica que el token tenga los permisos correctos
3. Asegúrate de haber redeployado después de agregar las variables

**Repositorio:** https://github.com/PolloFelizdgo/pollofelizdgo
**Admin Panel:** https://pollofelizdgo.vercel.app/admin
