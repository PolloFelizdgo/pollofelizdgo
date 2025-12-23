from PIL import Image

# Leer la imagen original
input_path = "public/logo-pollo-feliz.jpeg"
output_path = "public/logo-pollo-feliz.png"

# Abrir la imagen
img = Image.open(input_path)

# Convertir a RGBA si no lo está
img = img.convert("RGBA")

# Obtener los datos de píxeles
datas = img.getdata()

# Crear nueva lista de píxeles
new_data = []

# Definir el umbral para considerar blanco (ajustable)
threshold = 240

for item in datas:
    # Si el pixel es casi blanco (R,G,B > threshold), hacerlo transparente
    if item[0] > threshold and item[1] > threshold and item[2] > threshold:
        new_data.append((255, 255, 255, 0))  # Transparente
    else:
        new_data.append(item)

# Aplicar los nuevos datos
img.putdata(new_data)

# Guardar como PNG con transparencia
img.save(output_path, "PNG")

print(f"✓ Fondo blanco removido exitosamente!")
print(f"✓ Imagen guardada en: {output_path}")
