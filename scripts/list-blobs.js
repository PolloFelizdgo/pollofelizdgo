import { list } from '@vercel/blob';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function listBlobs() {
  try {
    console.log('📋 Listando imágenes en Vercel Blob...\n');
    
    const { blobs } = await list();
    
    if (blobs.length === 0) {
      console.log('⚠️  No hay imágenes subidas aún.');
      return;
    }

    console.log(`✅ Encontradas ${blobs.length} imágenes:\n`);
    
    const urls = {};
    blobs.forEach((blob, index) => {
      console.log(`${index + 1}. ${blob.pathname}`);
      console.log(`   URL: ${blob.url}\n`);
      urls[blob.pathname] = blob.url;
    });

    // Guardar las URLs
    const fs = await import('fs');
    fs.writeFileSync('blob-urls.json', JSON.stringify(urls, null, 2));
    console.log('💾 URLs guardadas en blob-urls.json');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listBlobs();
