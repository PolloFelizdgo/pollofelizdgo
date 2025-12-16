/**
 * Script para verificar qué imágenes del menú existen en Cloudinary
 * Ejecutar: node scripts/verify-cloudinary.js
 */

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dw55kbkmn',
  api_key: process.env.CLOUDINARY_API_KEY || '979973118959516',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'LPS1NIEDqfe25uErHaj3py0WYN0',
  secure: true
});

console.log('\n🔍 Verificando imágenes del menú en Cloudinary...\n');

// Leer menu.json
const menuPath = path.join(__dirname, '..', 'data', 'menu.json');
const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

// Extraer todos los cloudinaryPath
const paths = [];
for (const [category, items] of Object.entries(menuData.menu)) {
  if (Array.isArray(items)) {
    items.forEach(item => {
      if (item.cloudinaryPath) {
        paths.push({
          id: item.id,
          name: item.name,
          path: item.cloudinaryPath
        });
      }
    });
  }
}

console.log(`📦 Total de productos en menu.json: ${paths.length}\n`);

// Verificar cada imagen
const checkImages = async () => {
  const existing = [];
  const missing = [];
  
  for (const item of paths) {
    try {
      const result = await cloudinary.api.resource(item.path);
      existing.push(item);
      console.log(`✅ ${item.name} (${item.id})`);
      console.log(`   Path: ${item.path}`);
      console.log(`   URL: ${result.secure_url}\n`);
    } catch (error) {
      missing.push(item);
      console.log(`❌ ${item.name} (${item.id})`);
      console.log(`   Path: ${item.path}`);
      console.log(`   Error: Imagen no existe en Cloudinary\n`);
    }
  }
  
  console.log('='.repeat(60));
  console.log(`\n📊 Resumen:`);
  console.log(`   ✅ Imágenes existentes: ${existing.length}`);
  console.log(`   ❌ Imágenes faltantes: ${missing.length}\n`);
  
  if (missing.length > 0) {
    console.log('🔧 Imágenes que necesitas subir:\n');
    missing.forEach(item => {
      console.log(`   • ${item.name} (${item.id})`);
      console.log(`     Path esperado: ${item.path}\n`);
    });
    console.log('\n💡 Para solucionarlo:');
    console.log('   1. Ve a: http://localhost:3000/admin');
    console.log('   2. Edita cada producto que falte');
    console.log('   3. Sube la imagen correspondiente');
    console.log('   4. Guarda\n');
  } else {
    console.log('✅ ¡Todas las imágenes existen en Cloudinary!\n');
  }
};

checkImages().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
