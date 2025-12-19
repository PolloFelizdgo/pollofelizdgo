export default ({ env }) => ({
  upload: {
    config: {
      // Usa el proveedor local de Strapi para guardar archivos en ./public/uploads
      provider: 'local',
      providerOptions: {
        sizeLimit: 50 * 1024 * 1024, // 50MB de límite por archivo
      },
    },
  },
});
