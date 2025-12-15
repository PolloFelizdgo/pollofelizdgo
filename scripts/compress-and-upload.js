const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: 'dw55kbkmn',
  api_key: '979973118959516',
  api_secret: 'LPS1NIEDqfe25uErHaj3py0WYN0'
});

// Estructura de carpetas y archivos a subir
const imagesToUpload = [
  // Carpeta platillos/ (IMPORTANTE)
  { local: 'public/imagenes/platillos/combinacion.jpg', cloudinary: 'pollo-feliz/platillos/combinacion' },
  { local: 'public/imagenes/platillos/combinacion_nov25.jpg', cloudinary: 'pollo-feliz/platillos/combinacion_nov25' },
  { local: 'public/imagenes/platillos/perfil.jpg', cloudinary: 'pollo-feliz/platillos/perfil' },
  { local: 'public/imagenes/platillos/perfil_nov25.jpg', cloudinary: 'pollo-feliz/platillos/perfil_nov25' },
  
  // Carpeta slider/
  { local: 'public/slider/combinacion.jpg', cloudinary: 'pollo-feliz/slider/combinacion_slider' },
  { local: 'public/slider/perfil.jpg', cloudinary: 'pollo-feliz/slider/perfil_slider' },
  
  // Raíz de pollo-feliz/
  { local: 'public/imagenes/pollo_asado.png', cloudinary: 'pollo-feliz/pollo_asado' },
  { local: 'public/imagenes/HAMBURGUESA.png', cloudinary: 'pollo-feliz/hamburguesa' },
  { local: 'public/imagenes/combinacion.jpg', cloudinary: 'pollo-feliz/combinacion' },
  { local: 'public/imagenes/perfil nov25.jpg', cloudinary: 'pollo-feliz/perfil_nov25' },
  { local: 'public/imagenes/ensalda 2.png', cloudinary: 'pollo-feliz/ensalada_2' },
  { local: 'public/imagenes/ENSALADA 4.png', cloudinary: 'pollo-feliz/ensalada_4' },
  { local: 'public/imagenes/ENSALADA 5.png', cloudinary: 'pollo-feliz/ensalada_5' },
  { local: 'public/imagenes/Ensalada_Fresca.png', cloudinary: 'pollo-feliz/ensalada_fresca' },
  { local: 'public/imagenes/TACOS CARTERA.png', cloudinary: 'pollo-feliz/tacos' },
];

async function compressAndUploadImage(localPath, cloudinaryPath) {
  const fullPath = path.join(__dirname, '..', localPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Archivo no encontrado: ${localPath}`);
    return false;
  }

  try {
    // Obtener información del archivo original
    const stats = fs.statSync(fullPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`📦 Procesando: ${path.basename(localPath)} (${sizeMB} MB)`);
    
    // Comprimir la imagen si es mayor a 8MB
    let imageBuffer;
    if (stats.size > 8 * 1024 * 1024) {
      console.log(`   🔄 Comprimiendo imagen...`);
      
      // Comprimir con sharp
      const ext = path.extname(fullPath).toLowerCase();
      const sharpImage = sharp(fullPath);
      
      if (ext === '.jpg' || ext === '.jpeg') {
        imageBuffer = await sharpImage
          .jpeg({ quality: 80, progressive: true })
          .toBuffer();
      } else if (ext === '.png') {
        imageBuffer = await sharpImage
          .png({ quality: 80, compressionLevel: 9 })
          .toBuffer();
      } else {
        imageBuffer = fs.readFileSync(fullPath);
      }
      
      const newSizeMB = (imageBuffer.length / (1024 * 1024)).toFixed(2);
      console.log(`   ✂️  Comprimida: ${newSizeMB} MB (reducción de ${(((stats.size - imageBuffer.length) / stats.size) * 100).toFixed(1)}%)`);
    } else {
      imageBuffer = fs.readFileSync(fullPath);
    }
    
    // Subir a Cloudinary desde el buffer
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: cloudinaryPath,
          overwrite: true,
          resource_type: 'image',
          quality: 'auto:good',
          fetch_format: 'auto'
        },
        (error, result) => {
          if (error) {
            console.error(`   ❌ Error subiendo: ${error.message}`);
            resolve(false);
          } else {
            console.log(`   ✅ Subido exitosamente`);
            console.log(`   🔗 URL: ${result.secure_url}\n`);
            resolve(true);
          }
        }
      );
      
      uploadStream.end(imageBuffer);
    });
    
  } catch (error) {
    console.error(`❌ Error procesando ${localPath}:`, error.message);
    return false;
  }
}

async function uploadAll() {
  console.log('🚀 Iniciando compresión y subida de imágenes a Cloudinary...\n');
  console.log('📁 Se crearán automáticamente las carpetas:');
  console.log('   • pollo-feliz/platillos/');
  console.log('   • pollo-feliz/slider/');
  console.log('   • pollo-feliz/ (raíz)\n');
  
  let successful = 0;
  let failed = 0;
  let skipped = 0;
  
  for (const image of imagesToUpload) {
    const result = await compressAndUploadImage(image.local, image.cloudinary);
    if (result === true) {
      successful++;
    } else if (result === false && fs.existsSync(path.join(__dirname, '..', image.local))) {
      failed++;
    } else {
      skipped++;
    }
    
    // Pausa entre subidas
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN FINAL:');
  console.log('='.repeat(50));
  console.log(`✅ Exitosas:       ${successful}`);
  console.log(`❌ Fallidas:       ${failed}`);
  console.log(`⚠️  No encontradas: ${skipped}`);
  console.log('='.repeat(50));
  
  if (successful > 0) {
    console.log('\n✨ Las carpetas fueron creadas automáticamente en Cloudinary');
    console.log('🎯 Ahora las imágenes deberían cargarse correctamente en tu sitio');
  }
}

uploadAll().catch(console.error);
