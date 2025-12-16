import { NextResponse } from 'next/server';

// GET - Verificar configuración de Cloudinary
export async function GET() {
  const config = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'No configurado',
    hasApiKey: !!process.env.CLOUDINARY_API_KEY,
    hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
    status: 'unknown'
  };

  if (config.cloudName === 'No configurado') {
    config.status = 'error: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no está configurado';
  } else if (!config.hasApiKey) {
    config.status = 'error: CLOUDINARY_API_KEY no está configurado';
  } else if (!config.hasApiSecret) {
    config.status = 'error: CLOUDINARY_API_SECRET no está configurado';
  } else {
    config.status = 'ok: Cloudinary está configurado correctamente';
  }

  return NextResponse.json({
    success: config.status.startsWith('ok'),
    config: {
      cloudName: config.cloudName,
      hasApiKey: config.hasApiKey,
      hasApiSecret: config.hasApiSecret
    },
    message: config.status
  });
}
