#!/usr/bin/env node

/**
 * HERRAMIENTA INTERACTIVA DE GESTIÓN DE IMÁGENES
 * 
 * Esta herramienta facilita:
 * - Subir nuevas imágenes a Cloudinary
 * - Actualizar imágenes existentes
 * - Ver todas las imágenes en Cloudinary
 * - Comprimir y optimizar automáticamente
 */

import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dw55kbkmn',
  api_key: process.env.CLOUDINARY_API_KEY || '979973118959516',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'LPS1NIEDqfe25uErHaj3py0WYN0'
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function print(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Menú principal
async function showMenu() {
  console.clear();
  print('\n╔════════════════════════════════════════════════╗', 'cyan');
  print('║   🖼️  GESTOR DE IMÁGENES - POLLO FELIZ 🖼️    ║', 'cyan');
  print('╚════════════════════════════════════════════════╝', 'cyan');
  print('\n📋 Opciones:', 'bright');
  print('  1. 📤 Subir nueva imagen', 'yellow');
  print('  2. 🔄 Actualizar imagen existente', 'yellow');
  print('  3. 📋 Ver todas las imágenes', 'yellow');
  print('  4. 🗑️  Eliminar imagen', 'yellow');
  print('  5. 📁 Ver carpetas disponibles', 'yellow');
  print('  0. ❌ Salir\n', 'red');
  
  const option = await question('Elige una opción: ');
  return option.trim();
}

// Comprimir imagen
async function compressImage(inputPath, outputPath, quality = 80) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    print(`\n🔧 Comprimiendo imagen...`, 'cyan');
    print(`   Formato original: ${metadata.format}`, 'blue');
    print(`   Dimensiones: ${metadata.width}x${metadata.height}`, 'blue');
    
    let pipeline = image;
    
    // Redimensionar si es muy grande
    if (metadata.width > 1920) {
      pipeline = pipeline.resize(1920, null, { withoutEnlargement: true });
      print(`   ⚠️  Redimensionando a máximo 1920px de ancho`, 'yellow');
    }
    
    // Convertir y comprimir
    if (metadata.format === 'png') {
      await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outputPath);
      print(`   ✅ Convertido de PNG a JPEG`, 'green');
    } else {
      await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outputPath);
    }
    
    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    
    print(`   📦 Tamaño original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`, 'blue');
    print(`   📦 Tamaño comprimido: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`, 'green');
    print(`   💾 Reducción: ${reduction}%\n`, 'green');
    
    return true;
  } catch (error) {
    print(`❌ Error al comprimir: ${error.message}`, 'red');
    return false;
  }
}

// Subir imagen a Cloudinary
async function uploadToCloudinary(filePath, folder, publicId) {
  try {
    print(`\n☁️  Subiendo a Cloudinary...`, 'cyan');
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `pollo-feliz/${folder}`,
      public_id: publicId,
      overwrite: true,
      resource_type: 'image'
    });
    
    print(`✅ ¡Imagen subida exitosamente!`, 'green');
    print(`   URL: ${result.secure_url}`, 'blue');
    print(`   Public ID: ${result.public_id}`, 'blue');
    
    return result;
  } catch (error) {
    print(`❌ Error al subir: ${error.message}`, 'red');
    return null;
  }
}

// Opción 1: Subir nueva imagen
async function uploadNewImage() {
  console.clear();
  print('\n📤 SUBIR NUEVA IMAGEN\n', 'bright');
  
  const imagePath = await question('📁 Ruta de la imagen (ej: C:/Users/.../imagen.jpg): ');
  
  if (!fs.existsSync(imagePath)) {
    print('❌ Archivo no encontrado', 'red');
    await question('\nPresiona Enter para continuar...');
    return;
  }
  
  print('\n📁 Carpetas disponibles:', 'cyan');
  print('   1. platillos (combinaciones, piezas de pollo)', 'yellow');
  print('   2. productos (nuggets, hamburguesa, papas, etc.)', 'yellow');
  print('   3. slider (imágenes para carousel)', 'yellow');
  print('   4. otros (imágenes generales)', 'yellow');
  
  const folderOption = await question('\n📂 Selecciona carpeta (1-4): ');
  const folders = { '1': 'platillos', '2': 'productos', '3': 'slider', '4': 'otros' };
  const folder = folders[folderOption] || 'otros';
  
  const imageName = await question('\n🏷️  Nombre de la imagen (sin extensión, ej: pollo_asado): ');
  
  print('\n🎚️  Calidad de compresión:', 'cyan');
  print('   1. Alta (80 - recomendado)', 'yellow');
  print('   2. Media (60 - mayor compresión)', 'yellow');
  print('   3. Baja (40 - máxima compresión)', 'yellow');
  
  const qualityOption = await question('\n📊 Selecciona calidad (1-3): ');
  const qualities = { '1': 80, '2': 60, '3': 40 };
  const quality = qualities[qualityOption] || 80;
  
  // Comprimir
  const tempPath = path.join(process.cwd(), 'temp_compressed.jpg');
  const compressed = await compressImage(imagePath, tempPath, quality);
  
  if (!compressed) {
    await question('\nPresiona Enter para continuar...');
    return;
  }
  
  // Subir
  const result = await uploadToCloudinary(tempPath, folder, imageName);
  
  // Limpiar
  if (fs.existsSync(tempPath)) {
    fs.unlinkSync(tempPath);
  }
  
  if (result) {
    print('\n📝 SIGUIENTE PASO:', 'bright');
    print(`   1. Abre: src/lib/cloudinary-images.ts`, 'yellow');
    print(`   2. Agrega en la sección "${folder}":`, 'yellow');
    print(`      ${imageName}: '${folder}/${imageName}',`, 'green');
    print(`   3. Usa en tu código con:`, 'yellow');
    print(`      getCloudinaryImage(IMAGES.${folder}.${imageName})`, 'green');
  }
  
  await question('\nPresiona Enter para continuar...');
}

// Opción 2: Actualizar imagen existente
async function updateExistingImage() {
  console.clear();
  print('\n🔄 ACTUALIZAR IMAGEN EXISTENTE\n', 'bright');
  
  const imagePath = await question('📁 Ruta de la nueva imagen: ');
  
  if (!fs.existsSync(imagePath)) {
    print('❌ Archivo no encontrado', 'red');
    await question('\nPresiona Enter para continuar...');
    return;
  }
  
  const publicId = await question('\n🔑 Public ID de la imagen a reemplazar (ej: platillos/combinacion): ');
  const folder = publicId.includes('/') ? publicId.split('/')[0] : 'otros';
  const name = publicId.includes('/') ? publicId.split('/').slice(1).join('/') : publicId;
  
  const quality = 80;
  
  // Comprimir
  const tempPath = path.join(process.cwd(), 'temp_compressed.jpg');
  const compressed = await compressImage(imagePath, tempPath, quality);
  
  if (!compressed) {
    await question('\nPresiona Enter para continuar...');
    return;
  }
  
  // Subir (con overwrite)
  await uploadToCloudinary(tempPath, folder, name);
  
  // Limpiar
  if (fs.existsSync(tempPath)) {
    fs.unlinkSync(tempPath);
  }
  
  print('\n✅ Imagen actualizada. Los cambios se verán automáticamente.', 'green');
  await question('\nPresiona Enter para continuar...');
}

// Opción 3: Ver todas las imágenes
async function listAllImages() {
  console.clear();
  print('\n📋 LISTA DE IMÁGENES EN CLOUDINARY\n', 'bright');
  
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'pollo-feliz/',
      max_results: 500
    });
    
    if (result.resources.length === 0) {
      print('⚠️  No hay imágenes en Cloudinary', 'yellow');
    } else {
      print(`📊 Total de imágenes: ${result.resources.length}\n`, 'cyan');
      
      result.resources.forEach((resource, index) => {
        const size = (resource.bytes / 1024 / 1024).toFixed(2);
        print(`${index + 1}. ${resource.public_id}`, 'yellow');
        print(`   📦 Tamaño: ${size} MB | 📏 ${resource.width}x${resource.height}`, 'blue');
        print(`   🔗 ${resource.secure_url}\n`, 'cyan');
      });
    }
  } catch (error) {
    print(`❌ Error: ${error.message}`, 'red');
  }
  
  await question('\nPresiona Enter para continuar...');
}

// Opción 4: Eliminar imagen
async function deleteImage() {
  console.clear();
  print('\n🗑️  ELIMINAR IMAGEN\n', 'bright');
  
  const publicId = await question('🔑 Public ID de la imagen (ej: pollo-feliz/platillos/combinacion): ');
  
  print(`\n⚠️  ¿Estás seguro de eliminar "${publicId}"?`, 'yellow');
  const confirm = await question('Escribe "SI" para confirmar: ');
  
  if (confirm.toUpperCase() === 'SI') {
    try {
      await cloudinary.uploader.destroy(publicId);
      print('\n✅ Imagen eliminada exitosamente', 'green');
    } catch (error) {
      print(`\n❌ Error: ${error.message}`, 'red');
    }
  } else {
    print('\n❌ Operación cancelada', 'yellow');
  }
  
  await question('\nPresiona Enter para continuar...');
}

// Opción 5: Ver carpetas
async function showFolders() {
  console.clear();
  print('\n📁 ESTRUCTURA DE CARPETAS EN CLOUDINARY\n', 'bright');
  
  try {
    const result = await cloudinary.api.sub_folders('pollo-feliz');
    
    print('📂 pollo-feliz/', 'cyan');
    result.folders.forEach(folder => {
      print(`   ├── ${folder.name}/`, 'yellow');
    });
    print('\n💡 Usa estas carpetas al subir imágenes', 'blue');
  } catch (error) {
    print(`❌ Error: ${error.message}`, 'red');
  }
  
  await question('\nPresiona Enter para continuar...');
}

// Función principal
async function main() {
  let running = true;
  
  while (running) {
    const option = await showMenu();
    
    switch (option) {
      case '1':
        await uploadNewImage();
        break;
      case '2':
        await updateExistingImage();
        break;
      case '3':
        await listAllImages();
        break;
      case '4':
        await deleteImage();
        break;
      case '5':
        await showFolders();
        break;
      case '0':
        print('\n👋 ¡Hasta luego!', 'green');
        running = false;
        break;
      default:
        print('\n❌ Opción no válida', 'red');
        await question('Presiona Enter para continuar...');
    }
  }
  
  rl.close();
}

// Ejecutar
main().catch(error => {
  print(`\n❌ Error fatal: ${error.message}`, 'red');
  rl.close();
  process.exit(1);
});
