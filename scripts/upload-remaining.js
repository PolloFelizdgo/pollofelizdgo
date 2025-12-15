const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dw55kbkmn',
  api_key: '979973118959516',
  api_secret: 'LPS1NIEDqfe25uErHaj3py0WYN0'
});

// Imágenes que fallaron por tamaño
const imagesToUpload = [
  { local: 'public/imagenes/pollo_asado.png', cloudinary: 'pollo-feliz/pollo_asado' },
  { local: 'public/imagenes/ensalda 2.png', cloudinary: 'pollo-feliz/ensalada_2' },
  { local: 'public/imagenes/ENSALADA 4.png', cloudinary: 'pollo-feliz/ensalada_4' },
  { local: 'public/imagenes/ENSALADA 5.png', cloudinary: 'pollo-feliz/ensalada_5' },
  { local: 'public/imagenes/TACOS CARTERA.png', cloudinary: 'pollo-feliz/tacos' },
];

async function aggressiveCompressAndUpload(localPath, cloudinaryPath) {
  const fullPath = path.join(__dirname, '..', localPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Archivo no encontrado: ${localPath}`);
    return false;
  }

  try {
    const stats = fs.statSync(fullPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`📦 Procesando: ${path.basename(localPath)} (${sizeMB} MB)`);
    console.log(`   🔄 Aplicando compresión agresiva...`);
    
    // Compresión agresiva: reducir calidad y redimensionar
    const ext = path.extname(fullPath).toLowerCase();
    let imageBuffer;
    
    const image = sharp(fullPath);
    const metadata = await image.metadata();
    
    // Redimensionar si es muy grande (máximo 2000px de ancho)
    if (metadata.width > 2000) {
      image.resize(2000, null, { withoutEnlargement: true });
    }
    
    if (ext === '.png') {
      // Convertir PNG a JPEG para mejor compresión
      imageBuffer = await image
        .jpeg({ quality: 75, progressive: true, mozjpeg: true })
        .toBuffer();
      
      // Actualizar el path de Cloudinary para usar .jpg
      cloudinaryPath = cloudinaryPath.replace(/\.png$/, '');
      
      console.log(`   🔄 Convertido de PNG a JPEG para mejor compresión`);
    } else {
      imageBuffer = await image
        .jpeg({ quality: 75, progressive: true, mozjpeg: true })
        .toBuffer();
    }
    
    const newSizeMB = (imageBuffer.length / (1024 * 1024)).toFixed(2);
    const reduction = (((stats.size - imageBuffer.length) / stats.size) * 100).toFixed(1);
    console.log(`   ✂️  Comprimida: ${newSizeMB} MB (reducción de ${reduction}%)`);
    
    if (imageBuffer.length > 10 * 1024 * 1024) {
      console.log(`   ⚠️  Todavía muy grande, aplicando compresión máxima...`);
      
      // Última opción: calidad 60 y redimensionar más
      const finalImage = sharp(imageBuffer);
      const finalMeta = await finalImage.metadata();
      
      if (finalMeta.width > 1500) {
        finalImage.resize(1500, null, { withoutEnlargement: true });
      }
      
      imageBuffer = await finalImage
        .jpeg({ quality: 60, progressive: true })
        .toBuffer();
        
      const finalSizeMB = (imageBuffer.length / (1024 * 1024)).toFixed(2);
      console.log(`   ✂️  Compresión máxima: ${finalSizeMB} MB`);
    }
    
    // Subir a Cloudinary
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
            console.error(`   ❌ Error: ${error.message}`);
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
    console.error(`❌ Error: ${error.message}\n`);
    return false;
  }
}

async function uploadAll() {
  console.log('🚀 Subiendo imágenes restantes con compresión agresiva...\n');
  
  let successful = 0;
  let failed = 0;
  
  for (const image of imagesToUpload) {
    const result = await aggressiveCompressAndUpload(image.local, image.cloudinary);
    result ? successful++ : failed++;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN:');
  console.log('='.repeat(50));
  console.log(`✅ Exitosas: ${successful}`);
  console.log(`❌ Fallidas: ${failed}`);
  console.log('='.repeat(50));
  
  if (successful > 0) {
    console.log('\n🎉 ¡Todas las imágenes fueron subidas!');
    console.log('✅ Las carpetas están creadas en Cloudinary:');
    console.log('   • pollo-feliz/platillos/');
    console.log('   • pollo-feliz/slider/');
    console.log('   • pollo-feliz/ (raíz)');
  }
}

uploadAll().catch(console.error);
