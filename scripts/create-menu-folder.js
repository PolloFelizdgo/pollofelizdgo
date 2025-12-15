const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: 'dw55kbkmn',
  api_key: '979973118959516',
  api_secret: 'LPS1NIEDqfe25uErHaj3py0WYN0'
});

async function createMenuFolderAndCopyImages() {
  try {
    console.log('📋 Listando imágenes en pollo-feliz/platillos/...\n');
    
    // Listar todas las imágenes en platillos
    const resources = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'pollo-feliz/platillos/',
      max_results: 500
    });

    console.log(`✅ Encontradas ${resources.resources.length} imágenes en platillos/\n`);

    // Copiar cada imagen a la carpeta menu
    let successCount = 0;
    let errorCount = 0;

    for (const resource of resources.resources) {
      const publicId = resource.public_id;
      const fileName = publicId.split('/').pop();
      const newPublicId = `pollo-feliz/menu/${fileName}`;

      try {
        // Copiar la imagen
        await cloudinary.uploader.upload(resource.secure_url, {
          public_id: newPublicId,
          overwrite: false
        });
        
        console.log(`✅ Copiado: ${fileName}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error copiando ${fileName}: ${error.message}`);
        errorCount++;
      }
    }

    console.log(`\n📊 Resumen:`);
    console.log(`   ✅ Copiadas: ${successCount}`);
    console.log(`   ❌ Errores: ${errorCount}`);
    console.log(`\n🎉 ¡Carpeta "menu" creada con todas las imágenes!`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createMenuFolderAndCopyImages();
