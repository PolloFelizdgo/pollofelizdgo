/**
 * Test completo de upload simulando el proceso del admin
 */

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

console.log('\n🧪 Test de Upload Completo\n');

// Configurar Cloudinary EXACTAMENTE como en el código
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dw55kbkmn';
const apiKey = process.env.CLOUDINARY_API_KEY || '979973118959516';
const apiSecret = process.env.CLOUDINARY_API_SECRET || 'LPS1NIEDqfe25uErHaj3py0WYN0';

console.log('Configuración:');
console.log('- Cloud Name:', cloudName);
console.log('- API Key:', apiKey ? '***' + apiKey.slice(-4) : 'NO');
console.log('- API Secret:', apiSecret ? '***' + apiSecret.slice(-4) : 'NO');

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
});

console.log('\n📤 Probando upload de imagen de prueba...\n');

// Crear una imagen de prueba simple (1x1 pixel PNG)
const testImageBuffer = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// Upload usando stream (como en la API)
new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'pollo-feliz/test',
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 900, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    },
    (error, result) => {
      if (error) {
        console.error('❌ Error en upload_stream:', error);
        console.error('Código HTTP:', error.http_code);
        console.error('Mensaje:', error.message);
        reject(error);
      } else {
        console.log('✅ Upload exitoso!');
        console.log('Public ID:', result.public_id);
        console.log('URL:', result.secure_url);
        console.log('Tamaño:', result.bytes, 'bytes');
        resolve(result);
      }
    }
  );
  
  uploadStream.end(testImageBuffer);
})
.then(() => {
  console.log('\n✅ Test completado exitosamente!\n');
  process.exit(0);
})
.catch((error) => {
  console.error('\n❌ Test falló\n');
  process.exit(1);
});
