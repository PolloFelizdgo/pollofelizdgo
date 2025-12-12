Carpeta para imágenes de platillos usadas en el menú.

Convención de nombres (recomendada):
- <imageBase>.jpg           -> imagen por defecto (ej. pollo_asado.jpg)
- <imageBase>-320.jpg       -> variante 320px
- <imageBase>-640.jpg       -> variante 640px
- <imageBase>-1024.jpg      -> variante 1024px

Ejemplo:
- pollo_asado.jpg
- pollo_asado-320.jpg
- pollo_asado-640.jpg

Coloca aquí tus imágenes y luego ejecuta `npm run generate:images` si quieres generar variantes automáticas (requiere instalar `sharp`).

Nota: El endpoint `/api/images` indexa archivos en `public/imagenes` (no subcarpetas) por nombre base. Si quieres mantener organizadas las imágenes en subcarpetas, actualiza `src/app/api/images/route.ts` para indexar recursivamente esas rutas.
