# ⚡ GUÍA RÁPIDA: Configurar Admin Panel en Producción

## 🎯 Objetivo
Permitir que el admin panel funcione en producción (Vercel) y los cambios se reflejen automáticamente.

---

## 📝 PASO 1: Crear GitHub Token

### 1.1 Ir a GitHub
👉 https://github.com/settings/tokens

### 1.2 Click "Generate new token (classic)"
- **Nombre**: `Pollo Feliz Admin Panel`
- **Duración**: No expiration (recomendado)

### 1.3 Seleccionar permisos
✅ Marca **SOLO** esto:
- **repo** (Full control of private repositories)

### 1.4 Copiar el token
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
⚠️ **¡GUÁRDALO!** Solo se muestra una vez

---

## 🚀 PASO 2: Configurar Vercel

### 2.1 Ir al proyecto
👉 https://vercel.com/pollofelizdgos-projects/pollofelizdgo

### 2.2 Settings → Environment Variables

### 2.3 Agregar 3 variables:

#### Variable 1:
```
Name: GITHUB_TOKEN
Value: ghp_tu_token_que_copiaste
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2:
```
Name: GITHUB_OWNER
Value: PolloFelizdgo
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 3:
```
Name: GITHUB_REPO
Value: pollofelizdgo
Environments: ✅ Production ✅ Preview ✅ Development
```

### 2.4 Click "Save" en cada una

---

## 🔄 PASO 3: Redesplegar

### Opción A: Desde tu computadora
```bash
cd C:\Users\laptop_repuesto\Desktop\pagina_web
vercel --prod
```

### Opción B: Desde Vercel Dashboard
1. Ve a **Deployments**
2. Click en el último deployment
3. **⋯** (three dots) → **Redeploy**

---

## ✅ PASO 4: Verificar

### 4.1 Ir al admin en producción
👉 https://pollofelizdgo.vercel.app/admin
- Password: `pollofeliz2025`

### 4.2 Editar un producto de prueba
1. Click "Editar" en cualquier producto
2. Cambia el precio o descripción
3. Click "Guardar"

### 4.3 Verificar mensaje
Deberías ver:
```
✅ Cambios guardados. Vercel desplegará automáticamente en ~2 minutos
```

### 4.4 Esperar 2-3 minutos
- Ve a Vercel → Deployments
- Verás un nuevo deployment automático

### 4.5 Verificar en la página
- Recarga https://pollofelizdgo.vercel.app
- Los cambios deben estar visibles ✅

---

## 🎉 ¡LISTO!

Ahora puedes:
- ✅ Editar menú desde producción
- ✅ Agregar/eliminar productos
- ✅ Los cambios se reflejan automáticamente
- ✅ No necesitas terminal ni comandos git

---

## 🐛 Problemas comunes

### ❌ "GITHUB_TOKEN no configurado"
**Solución**: Verifica que agregaste las 3 variables en Vercel y redeployaste

### ❌ "Error de GitHub: Bad credentials"
**Solución**: El token es inválido. Genera uno nuevo y actualiza en Vercel

### ❌ Los cambios no se ven
**Solución**: 
1. Espera 3-4 minutos completos
2. Verifica en Vercel → Deployments que haya un deployment nuevo
3. Haz "hard refresh": Ctrl + Shift + R

---

## 📚 Documentación completa
Lee [GITHUB_TOKEN_SETUP.md](./GITHUB_TOKEN_SETUP.md) para más detalles.

---

## 🔥 Workflow completo

```
┌─────────────────────────┐
│  Admin Panel (Producción) │
│  /admin                  │
└───────────┬──────────────┘
            │ Edita producto
            ▼
┌─────────────────────────┐
│  API /api/menu          │
│  GitHub API             │
└───────────┬──────────────┘
            │ Commit automático
            ▼
┌─────────────────────────┐
│  GitHub Repository      │
│  menu.json actualizado  │
└───────────┬──────────────┘
            │ Webhook trigger
            ▼
┌─────────────────────────┐
│  Vercel                 │
│  Auto-deploy (~2 min)   │
└───────────┬──────────────┘
            │
            ▼
┌─────────────────────────┐
│  ✅ Sitio actualizado   │
│  Cambios visibles       │
└─────────────────────────┘
```

---

**Fecha de implementación**: 2025-12-17
**Versión**: 1.0.0
