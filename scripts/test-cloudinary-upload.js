/**
 * Script de Prueba de Conexión a Cloudinary
 * Ejecutar: node scripts/test-cloudinary-upload.js
 */

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

console.log('\n🔍 Probando conexión con Cloudinary...\n');

// Configurar
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

console.log('Configuración:');
console.log('- Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log('- API Key:', process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'NO CONFIGURADO');
console.log('- API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'NO CONFIGURADO');

console.log('\n🧪 Probando API de Cloudinary...\n');

// Probar con ping
cloudinary.api.ping()
  .then(result => {
    console.log('✅ Conexión exitosa!');
    console.log('Respuesta:', result);
    console.log('\n✅ Las credenciales son válidas y Cloudinary está accesible.\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error al conectar con Cloudinary:');
    console.error('Status:', error.http_code);
    console.error('Mensaje:', error.message);
    
    if (error.http_code === 401) {
      console.error('\n❌ Error 401: Credenciales inválidas');
      console.error('Solución:');
      console.error('1. Verifica en https://cloudinary.com/console');
      console.error('2. Copia las credenciales correctas');
      console.error('3. Actualiza .env.local');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('\n❌ Error de red: No se puede conectar a Cloudinary');
      console.error('Solución:');
      console.error('1. Verifica tu conexión a internet');
      console.error('2. Desactiva VPN si tienes');
      console.error('3. Verifica que no haya firewall bloqueando');
    } else {
      console.error('\nError completo:', error);
    }
    
    console.error('\n');
    process.exit(1);
  });
