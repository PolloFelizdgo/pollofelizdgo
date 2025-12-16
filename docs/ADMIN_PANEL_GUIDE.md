# 🎛️ Guía del Panel de Administración - Pollo Feliz

## 📋 Acceso al Panel

### 🔐 Iniciar Sesión

1. **Ve a**: `https://tu-sitio.com/admin`
2. **Ingresa la contraseña**: `pollofeliz2025` (o la que te hayan proporcionado)
3. **Clic en** "Iniciar Sesión"

---

## 🏠 Vista del Panel

El panel tiene 3 secciones principales:

```
┌─────────────────────────────────────────┐
│  🍗 Panel de Administración             │
│  [Ver Sitio] [Cerrar Sesión]           │
├─────────────────────────────────────────┤
│  14 Productos en el Menú                │
│               [+ Agregar Producto]      │
├─────────────────────────────────────────┤
│  📦 📦 📦  ← Tarjetas de productos      │
│  📦 📦 📦                                │
└─────────────────────────────────────────┘
```

---

## ➕ Agregar Nuevo Producto

### Paso 1: Abrir Formulario
- Clic en botón verde **"+ Agregar Producto"**

### Paso 2: Llenar Información

| Campo | Descripción | Ejemplo | Requerido |
|-------|-------------|---------|-----------|
| **ID único** | Identificador sin espacios | `hamburguesa-especial` | ✅ Sí |
| **Nombre** | Nombre del producto | `Hamburguesa Especial` | ✅ Sí |
| **Descripción** | Texto atractivo | `Hamburguesa jugosa con ingredientes selectos` | ❌ No |
| **Precio** | Precio en pesos | `119.00` | ❌ No |
| **Categoría** | Tipo de producto | Selecciona del menú | ✅ Sí |
| **Imagen** | Foto del producto | Sube archivo o pega URL | ✅ Sí |

### Paso 3: Subir Imagen (REQUERIDO)

**Cómo subir la imagen**:
1. Clic en **"Sube una imagen"** en el área de drag & drop
2. Selecciona la foto del producto (JPG, PNG o WEBP)
3. Espera a que aparezca ✅ "Imagen subida exitosamente"
4. Verás el preview de la imagen
5. ✅ Listo, puedes continuar

**Validaciones automáticas**:
- ✅ Solo acepta JPG, PNG, WEBP
- ✅ Tamaño máximo: 5MB
- ✅ Sube directo a Cloudinary
- ✅ Preview inmediato

### Paso 4: Opciones Extra
- ✅ **Más vendido**: Marca si es un bestseller
- ✅ **Disponible**: Desmarca si está agotado

### Paso 5: Guardar
- Clic en **"Crear Producto"**
- Verás mensaje verde: "Producto creado exitosamente"

---

## ✏️ Editar Producto Existente

### Paso 1: Encontrar Producto
- Busca la tarjeta del producto que quieres editar

### Paso 2: Abrir Editor
- Clic en botón azul **"Editar"**

### Paso 3: Modificar
- Cambia los campos que necesites
- **Nota**: El ID no se puede cambiar

### Paso 4: Actualizar
- Clic en **"Actualizar Producto"**
- Verás mensaje: "Producto actualizado exitosamente"

---

## 🗑️ Eliminar Producto

### ⚠️ CUIDADO: Esta acción NO se puede deshacer

1. Encuentra el producto a eliminar
2. Clic en botón rojo **"Eliminar"**
3. Confirma en el mensaje que aparece
4. El producto se borra inmediatamente

---

## 🖼️ Gestión de Imágenes

### Tipos de Archivo Aceptados
- ✅ JPG / JPEG
- ✅ PNG
- ✅ WebP
- ❌ GIF, SVG, BMP (no soportados)

### Tamaño y Límites
- **Ancho recomendado**: 1200px
- **Alto recomendado**: 900px
- **Peso máximo**: 50MB (el sistema lo valida)
- **Validación**: Automática antes de subir

### Tips para Buenas Fotos
1. ✅ Usa buena iluminación
2. ✅ Fondo limpio y simple
3. ✅ Muestra bien el producto
4. ✅ Enfoque nítido
5. ❌ Evita fotos borrosas
6. ❌ Evita fondos muy llenos

---

## 📊 Categorías Disponibles

| Categoría | Para qué usar |
|-----------|---------------|
| **Promoción** | Ofertas especiales, combos |
| **Pollo** | Piezas de pollo (cadera, pierna, etc.) |
| **Complementos** | Nuggets, hamburguesas |
| **Acompañamientos** | Papas, ensaladas |
| **Bebidas** | Refrescos, agua, jugos |
| **Salsas** | Salsas y aderezos |

---

## 💡 Casos de Uso Comunes

### Cambiar Precio de un Producto
1. Busca el producto
2. Clic en **"Editar"**
3. Cambia el campo **Precio**
4. Clic en **"Actualizar Producto"**

### Marcar Producto como Agotado
1. Busca el producto
2. Clic en **"Editar"**
3. **Desmarca** la casilla "Disponible"
4. Clic en **"Actualizar Producto"**
5. Aparecerá etiqueta roja "No disponible"

### Cambiar Foto de un Producto
1. Busca el producto
2. Clic en **"Editar"**
3. Sube la nueva imagen
4. Espera confirmación
5. Clic en **"Actualizar Producto"**

### Agregar Promoción Nueva
1. Clic en **"+ Agregar Producto"**
2. Llena información
3. **Categoría**: Selecciona "Promoción"
4. **Marca** "Más vendido" si aplica
5. Sube imagen
6. Clic en **"Crear Producto"**

---

## 🚨 Solución de Problemas

### "Error al subir imagen"
**Posibles causas**:
- Archivo muy pesado (más de 50MB)
- Formato no soportado (solo JPG, PNG, WEBP)
- Conexión a internet lenta
- Credenciales de Cloudinary no configuradas

**Solución**:
- Verifica el tamaño: debe ser menor a 50MB
- Usa JPG (más ligero que PNG)
- Verifica tu conexión a internet
- Contacta al administrador si persiste

**El sistema te mostrará el error específico**:
- "Solo se permiten imágenes JPG, PNG o WEBP"
- "La imagen no debe superar 50MB"

### "El ID ya existe"
**Causa**: Ya hay un producto con ese ID

**Solución**:
- Usa un ID diferente
- Ejemplo: Si usaste `hamburguesa`, prueba `hamburguesa-especial`

### "Producto no encontrado"
**Causa**: El producto ya fue eliminado

**Solución**:
- Recarga la página (F5)
- Los cambios se actualizarán

### No puedo iniciar sesión
**Posibles causas**:
- Contraseña incorrecta
- Bloqueado por intentos fallidos

**Solución**:
- Verifica la contraseña correcta
- Espera 1 minuto e intenta de nuevo
- Contacta al administrador del sistema

---

## 📱 Uso desde Celular

El panel funciona en celulares, pero es **más fácil desde computadora**.

### Tips para Móvil:
1. ✅ Usa orientación **horizontal** (voltea el teléfono)
2. ✅ Haz zoom si los botones son pequeños
3. ✅ Ten paciencia al subir fotos (puede tardar)

---

## ⚠️ Mejores Prácticas

### ✅ HAZ ESTO:
1. **Revisa antes de guardar**: Verifica que todo esté correcto
2. **Usa IDs descriptivos**: `pollo-entero` es mejor que `prod-01`
3. **Escribe descripciones atractivas**: Vende el producto
4. **Sube fotos de calidad**: Primera impresión cuenta
5. **Marca bestsellers**: Solo los realmente más vendidos
6. **Actualiza precios regularmente**: Mantén información al día

### ❌ NO HAGAS ESTO:
1. **No uses IDs con espacios**: `pollo entero` ❌ → `pollo-entero` ✅
2. **No subas fotos borrosas**: La calidad importa
3. **No dejes campos vacíos sin razón**: Llena todo lo posible
4. **No elimines sin confirmar**: Piénsalo dos veces
5. **No uses caracteres especiales en IDs**: Solo letras, números y guiones

---

## 🔒 Seguridad

### Protege tu Contraseña
- ❌ No la compartas con nadie
- ❌ No la escribas en lugares públicos
- ✅ Cierra sesión al terminar
- ✅ No uses el panel en computadoras públicas

### Sesión Automática
- La sesión se mantiene mientras tengas la pestaña abierta
- Si cierras el navegador, tendrás que iniciar sesión de nuevo
- Por seguridad, esto es intencional

---

## 📞 ¿Necesitas Ayuda?

### Contacto Técnico
Si tienes problemas:
1. Intenta refrescar la página (F5)
2. Limpia el caché del navegador
3. Intenta desde otro navegador
4. Contacta al equipo técnico

---

## 🎓 Tutorial Rápido en Video

### Video 1: Agregar Producto (2 min)
```
1. Clic en "+ Agregar Producto"
2. Llenar formulario
3. Subir imagen
4. Clic en "Crear Producto"
```

### Video 2: Editar Producto (1 min)
```
1. Buscar producto
2. Clic en "Editar"
3. Modificar campos
4. Clic en "Actualizar Producto"
```

### Video 3: Subir Imagen (1 min)
```
1. Clic en "Elegir archivo"
2. Seleccionar foto
3. Esperar confirmación
4. Ver preview de imagen
```

---

## ✅ Checklist Antes de Crear Producto

Antes de hacer clic en "Crear Producto", verifica:

- [ ] ID único sin espacios
- [ ] Nombre claro y atractivo
- [ ] Descripción que venda el producto
- [ ] Precio correcto (con centavos)
- [ ] Categoría apropiada
- [ ] Imagen subida correctamente
- [ ] Vista previa de imagen se ve bien
- [ ] Marcado como "Más vendido" solo si aplica
- [ ] Marcado como "Disponible"

---

## 🎉 ¡Listo para Usar!

El panel es intuitivo y fácil de usar. Con esta guía puedes:
- ✅ Agregar nuevos productos en minutos
- ✅ Actualizar precios al instante
- ✅ Cambiar imágenes sin ayuda técnica
- ✅ Gestionar todo el menú tú mismo/a

**¡Comienza a gestionar tu menú ahora!** 🍗✨

---

**Última actualización**: 16 de diciembre de 2025
**Versión del Panel**: 1.0
