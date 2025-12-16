import { NextResponse } from 'next/server';

// GET - Verificar configuración de Cloudinary
export async function GET() {
  // Usar valores hardcodeados como fallback
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dw55kbkmn';
  const apiKey = process.env.CLOUDINARY_API_KEY || '979973118959516';
  const apiSecret = process.env.CLOUDINARY_API_SECRET || 'LPS1NIEDqfe25uErHaj3py0WYN0';
  
  const config = {
    cloudName,
    hasApiKey: !!apiKey,
    hasApiSecret: !!apiSecret,
    status: 'ok: Cloudinary está configurado correctamente'
  };

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
