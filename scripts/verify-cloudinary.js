/**
 * Script de Verificación de Cloudinary
 * Ejecutar: node scripts/verify-cloudinary.js
 */

require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Verificando configuración de Cloudinary...\n');

const checks = {
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME': process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  'CLOUDINARY_API_KEY': process.env.CLOUDINARY_API_KEY,
  'CLOUDINARY_API_SECRET': process.env.CLOUDINARY_API_SECRET,
};

let allGood = true;

Object.entries(checks).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: Configurado`);
    if (key === 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME') {
      console.log(`   Valor: ${value}`);
    } else {
      console.log(`   Valor: ${'*'.repeat(Math.min(value.length, 20))} (oculto)`);
    }
  } else {
    console.log(`❌ ${key}: NO CONFIGURADO`);
    allGood = false;
  }
});

console.log('\n' + '='.repeat(60));

if (allGood) {
  console.log('✅ Todas las variables están configuradas correctamente\n');
  console.log('Puedes continuar con el upload de imágenes.\n');
} else {
  console.log('❌ Faltan variables de entorno\n');
  console.log('Solución:');
  console.log('1. Crea o edita el archivo .env.local');
  console.log('2. Agrega las variables faltantes:');
  console.log('   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dw55kbkmn');
  console.log('   CLOUDINARY_API_KEY=tu_api_key');
  console.log('   CLOUDINARY_API_SECRET=tu_api_secret');
  console.log('3. Reinicia el servidor: pnpm dev\n');
}

console.log('='.repeat(60) + '\n');
