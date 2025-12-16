import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// POST - Subir imagen a Cloudinary
export async function POST(request: Request) {
  try {
    // Verificar que las variables de entorno estén configuradas
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    console.log('🔍 Verificando configuración de Cloudinary...');
    console.log('Cloud Name:', cloudName ? '✅ Configurado' : '❌ Falta');
    console.log('API Key:', apiKey ? '✅ Configurado' : '❌ Falta');
    console.log('API Secret:', apiSecret ? '✅ Configurado' : '❌ Falta');

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('❌ Cloudinary no está configurado correctamente');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Cloudinary no está configurado. Verifica las variables de entorno en .env.local' 
        },
        { status: 500 }
      );
    }

    // Configurar Cloudinary explícitamente en cada request
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true
    });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'pollo-feliz/menu';
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se proporcionó archivo' },
        { status: 400 }
      );
    }

    console.log(`📤 Subiendo imagen: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    console.log(`📁 Carpeta destino: ${folder}`);
    
    // Convertir File a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    console.log(`📦 Buffer creado: ${buffer.length} bytes`);
    
    // Subir a Cloudinary usando un Promise
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
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
            reject(error);
          } else {
            console.log('✅ Upload completado');
            resolve(result);
          }
        }
      );
      
      uploadStream.end(buffer);
    });
    
    const uploadResult = result as any;
    
    console.log(`✅ Imagen subida exitosamente: ${uploadResult.public_id}`);
    
    return NextResponse.json({
      success: true,
      cloudinaryPath: uploadResult.public_id,
      url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height
    });
    
  } catch (error: any) {
    console.error('❌ Error al subir imagen:', error);
    console.error('Error completo:', JSON.stringify(error, null, 2));
    
    // Mensajes de error más específicos
    let errorMessage = 'Error al subir imagen';
    let errorDetails = '';
    
    if (error.http_code === 401 || error.message?.toLowerCase().includes('api key')) {
      errorMessage = 'Credenciales de Cloudinary inválidas';
      errorDetails = 'Verifica CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en .env.local';
    } else if (error.http_code === 400) {
      errorMessage = 'Error en la solicitud';
      errorDetails = error.message || 'Formato de imagen no válido';
    } else if (error.message?.toLowerCase().includes('network') || error.code === 'ENOTFOUND') {
      errorMessage = 'Error de conexión';
      errorDetails = 'Verifica tu conexión a internet';
    } else if (error.message?.toLowerCase().includes('timeout')) {
      errorMessage = 'Tiempo de espera agotado';
      errorDetails = 'Intenta con una imagen más pequeña';
    } else if (error.message) {
      errorMessage = error.message;
      errorDetails = error.error?.message || '';
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: errorDetails,
        httpCode: error.http_code || null
      },
      { status: error.http_code || 500 }
    );
  }
}

// DELETE - Eliminar imagen de Cloudinary
export async function DELETE(request: Request) {
  try {
    // Configurar Cloudinary explícitamente
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    });

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');
    
    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID requerido' },
        { status: 400 }
      );
    }
    
    console.log(`🗑️ Eliminando imagen: ${publicId}`);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`✅ Imagen eliminada:`, result);
    
    return NextResponse.json({
      success: true,
      result: result
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error al eliminar imagen' },
      { status: 500 }
    );
  }
}
