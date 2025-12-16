# 🎛️ Panel de Administración - Inicio Rápido

## 🚀 Acceso Inmediato

```
URL: http://localhost:3000/admin (desarrollo)
URL: https://pollofelizdgo.vercel.app/admin (producción)

Contraseña: pollofeliz2025
```

## ⚙️ Configuración (Primera Vez)

### 1. Crea archivo `.env.local`:

```bash
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dw55kbkmn
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=pollofeliz2025
```

### 2. Obtén credenciales de Cloudinary:

1. Ve a: https://cloudinary.com/console
2. Copia **API Key** y **API Secret**
3. Pégalos en `.env.local`

### 3. Inicia el servidor:

```bash
pnpm dev
```

### 4. Abre el panel:

```
http://localhost:3000/admin
```

## ✨ Qué Puedes Hacer

- ✅ **Agregar productos**: Formulario simple + subir imagen
- ✅ **Editar productos**: Cambiar precio, descripción, imagen
- ✅ **Eliminar productos**: Con confirmación de seguridad
- ✅ **Subir imágenes**: Drag & drop directo a Cloudinary
- ✅ **Ver preview**: Tiempo real de cómo se verá

## 📚 Documentación Completa

- **Usuario final**: `docs/ADMIN_PANEL_GUIDE.md`
- **Desarrollador**: `docs/CRUD_README.md`

## 🎯 Ejemplo de Uso

### Agregar un producto:

1. Clic en "+ Agregar Producto"
2. ID: `hamburguesa-premium`
3. Nombre: `Hamburguesa Premium`
4. Descripción: `Hamburguesa gourmet con ingredientes premium`
5. Precio: `129.00`
6. Categoría: `Complementos`
7. Subir imagen (clic en "Elegir archivo")
8. Clic en "Crear Producto"
9. ✅ ¡Listo! Visible en el sitio inmediatamente

## 🛠️ APIs Disponibles

- `GET /api/menu` - Listar productos
- `POST /api/menu` - Crear producto
- `PUT /api/menu` - Actualizar producto
- `DELETE /api/menu?id=...` - Eliminar producto
- `POST /api/upload` - Subir imagen a Cloudinary

## 🔒 Seguridad

- Autenticación con contraseña
- Validación de datos
- Confirmación antes de eliminar
- IDs únicos verificados

## 💡 Tips

1. **Imágenes**: 1200x900px, JPG, máx 2MB
2. **IDs**: Sin espacios, usa guiones
3. **Descripciones**: Atractivas y que vendan
4. **Precios**: Siempre con 2 decimales

---

**¿Preguntas?** Lee `docs/ADMIN_PANEL_GUIDE.md` 📖
