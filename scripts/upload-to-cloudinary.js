const cloudinary = require('cloudinary').v2;
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
  // Carpeta platillos/ (IMPORTANTE: esta carpeta debe existir en Cloudinary)
  { local: 'public/imagenes/platillos/combinacion.jpg', cloudinary: 'pollo-feliz/platillos/combinacion' },
  { local: 'public/imagenes/platillos/combinacion_nov25.jpg', cloudinary: 'pollo-feliz/platillos/combinacion_nov25' },
  { local: 'public/imagenes/platillos/perfil.jpg', cloudinary: 'pollo-feliz/platillos/perfil' },
  { local: 'public/imagenes/platillos/perfil_nov25.jpg', cloudinary: 'pollo-feliz/platillos/perfil_nov25' },
  { local: 'public/imagenes/platillos/equipo.jpg', cloudinary: 'pollo-feliz/platillos/equipo' },
  
  // Carpeta slider/ (banners principales)
  { local: 'public/slider/combinacion.jpg', cloudinary: 'pollo-feliz/slider/combinacion' },
  { local: 'public/slider/combinacion.png', cloudinary: 'pollo-feliz/slider/combinacion' },
  { local: 'public/slider/perfil.jpg', cloudinary: 'pollo-feliz/slider/perfil' },
  
  // Raíz de pollo-feliz/ (imágenes principales del menú)
  { local: 'public/imagenes/pollo_asado.png', cloudinary: 'pollo-feliz/pollo_asado' },
  { local: 'public/imagenes/nuggets.png', cloudinary: 'pollo-feliz/nuggets' },
  { local: 'public/imagenes/HAMBURGUESA.png', cloudinary: 'pollo-feliz/hamburguesa' },
  { local: 'public/imagenes/combinacion.jpg', cloudinary: 'pollo-feliz/combinacion' },
  { local: 'public/imagenes/perfil nov25.jpg', cloudinary: 'pollo-feliz/perfil_nov25' },
  { local: 'public/imagenes/ensalda 2.png', cloudinary: 'pollo-feliz/ensalada_2' },
  { local: 'public/imagenes/ENSALADA 4.png', cloudinary: 'pollo-feliz/ensalada_4' },
  { local: 'public/imagenes/ENSALADA 5.png', cloudinary: 'pollo-feliz/ensalada_5' },
  { local: 'public/imagenes/Ensalada_Fresca.png', cloudinary: 'pollo-feliz/ensalada_fresca' },
  
  // Otras imágenes del menú
  { local: 'public/imagenes/PALOMITAS.png', cloudinary: 'pollo-feliz/palomitas' },
  { local: 'public/imagenes/PAPAS FRANC.png', cloudinary: 'pollo-feliz/papas_francesas' },
  { local: 'public/imagenes/PAPAS GAJO.png', cloudinary: 'pollo-feliz/papas_gajo' },
  { local: 'public/imagenes/papa asada.png', cloudinary: 'pollo-feliz/papa_asada' },
  { local: 'public/imagenes/QUESADILLA.png', cloudinary: 'pollo-feliz/quesadilla' },
  { local: 'public/imagenes/TACOS CARTERA.png', cloudinary: 'pollo-feliz/tacos' },
  { local: 'public/imagenes/CALDO.png', cloudinary: 'pollo-feliz/caldo' },
  { local: 'public/imagenes/SPAGUETTI.png', cloudinary: 'pollo-feliz/spaguetti' },
  { local: 'public/imagenes/sopa.png', cloudinary: 'pollo-feliz/sopa' },
];

async function uploadImage(localPath, cloudinaryPath) {
  const fullPath = path.join(__dirname, '..', localPath);
  
  // Verificar si el archivo existe
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Archivo no encontrado: ${localPath}`);
    return false;
  }

  try {
    const result = await cloudinary.uploader.upload(fullPath, {
      public_id: cloudinaryPath,
      overwrite: true,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto'
    });
    
    console.log(`✅ Subido: ${cloudinaryPath}`);
    console.log(`   URL: ${result.secure_url}`);
    return true;
  } catch (error) {
    console.error(`❌ Error subiendo ${localPath}:`, error.message);
    return false;
  }
}

async function uploadAll() {
  console.log('🚀 Iniciando subida de imágenes a Cloudinary...\n');
  
  let successful = 0;
  let failed = 0;
  let skipped = 0;
  
  for (const image of imagesToUpload) {
    const result = await uploadImage(image.local, image.cloudinary);
    if (result === true) {
      successful++;
    } else if (result === false && fs.existsSync(path.join(__dirname, '..', image.local))) {
      failed++;
    } else {
      skipped++;
    }
    
    // Pequeña pausa entre subidas
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 Resumen:');
  console.log(`   ✅ Exitosas: ${successful}`);
  console.log(`   ❌ Fallidas: ${failed}`);
  console.log(`   ⚠️  No encontradas: ${skipped}`);
}

uploadAll().catch(console.error);
