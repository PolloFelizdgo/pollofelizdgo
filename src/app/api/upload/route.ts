import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dw55kbkmn',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST - Subir imagen a Cloudinary
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'pollo-feliz/menu';
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se proporcionó archivo' },
        { status: 400 }
      );
    }
    
    // Convertir File a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Subir a Cloudinary usando un Promise
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
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
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    
    const uploadResult = result as any;
    
    return NextResponse.json({
      success: true,
      cloudinaryPath: uploadResult.public_id,
      url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height
    });
    
  } catch (error: any) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al subir imagen' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar imagen de Cloudinary
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');
    
    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID requerido' },
        { status: 400 }
      );
    }
    
    const result = await cloudinary.uploader.destroy(publicId);
    
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
