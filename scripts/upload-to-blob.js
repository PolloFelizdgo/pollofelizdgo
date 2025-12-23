import { put, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadToBlob() {
  // Verificar que el token esté disponible
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN no está configurado');
    console.log('Token encontrado:', token ? 'Sí' : 'No');
    process.exit(1);
  }
  
  console.log('🚀 Subiendo imágenes a Vercel Blob...\n');

  const imagesToUpload = [
    // Logo principal
    { local: 'public/logo-pollo-feliz.png', blob: 'logo-pollo-feliz.png' },
    
    // Imágenes críticas para el sitio
    { local: 'public/imagenes/platillos/combinacion.jpg', blob: 'platillos/combinacion.jpg' },
    { local: 'public/imagenes/platillos/perfil.jpg', blob: 'platillos/perfil.jpg' },
    { local: 'public/imagenes/platillos/equipo.jpg', blob: 'platillos/equipo.jpg' },
    
    // Imágenes del slider
    { local: 'public/slider/1.jpg', blob: 'slider/1.jpg' },
    { local: 'public/slider/2.jpg', blob: 'slider/2.jpg' },
    { local: 'public/slider/3.jpg', blob: 'slider/3.jpg' },
  ];

  const uploadedUrls = {};
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const image of imagesToUpload) {
    const localPath = path.join(__dirname, '..', image.local);
    
    try {
      // Verificar si el archivo existe
      if (!fs.existsSync(localPath)) {
        console.log(`⚠️  Archivo no encontrado: ${image.local}`);
        skipped++;
        continue;
      }

      // Leer el archivo
      const fileBuffer = fs.readFileSync(localPath);
      const blob = new Blob([fileBuffer]);

      // Subir a Vercel Blob
      console.log(`📤 Subiendo: ${image.blob}...`);
      const { url } = await put(image.blob, blob, {
        access: 'public',
        addRandomSuffix: false, // No agregar sufijo aleatorio para mantener URLs consistentes
      });

      uploadedUrls[image.blob] = url;
      console.log(`✅ Subido: ${url}\n`);
      uploaded++;

    } catch (error) {
      console.error(`❌ Error subiendo ${image.local}:`, error.message);
      failed++;
    }
  }

  console.log('\n📊 Resumen:');
  console.log(`✅ Subidas exitosas: ${uploaded}`);
  console.log(`⚠️  Omitidas: ${skipped}`);
  console.log(`❌ Fallos: ${failed}`);

  // Guardar el mapeo de URLs
  const mappingPath = path.join(__dirname, '..', 'blob-urls.json');
  fs.writeFileSync(mappingPath, JSON.stringify(uploadedUrls, null, 2));
  console.log(`\n💾 URLs guardadas en: blob-urls.json`);
  
  return uploadedUrls;
}

// Ejecutar
uploadToBlob().catch(console.error);
