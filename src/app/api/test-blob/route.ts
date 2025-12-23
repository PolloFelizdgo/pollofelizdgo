import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar que el token esté configurado
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'BLOB_READ_WRITE_TOKEN no está configurado',
        message: 'Verifica que la variable de entorno esté configurada en Vercel'
      }, { status: 500 });
    }

    // Intentar listar algunos blobs
    const { blobs } = await list({ limit: 10 });

    return NextResponse.json({
      success: true,
      message: '✅ Conexión exitosa con Vercel Blob',
      stats: {
        totalImages: blobs.length,
        tokenConfigured: true,
      },
      samples: blobs.map(blob => ({
        name: blob.pathname,
        url: blob.url,
        size: `${(blob.size / 1024 / 1024).toFixed(2)} MB`,
        uploadedAt: blob.uploadedAt
      }))
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      message: '❌ Error al conectar con Vercel Blob'
    }, { status: 500 });
  }
}
