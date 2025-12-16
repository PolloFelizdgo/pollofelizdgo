import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary con valores hardcodeados
cloudinary.config({
  cloud_name: 'dw55kbkmn',
  api_key: '979973118959516',
  api_secret: 'LPS1NIEDqfe25uErHaj3py0WYN0',
  secure: true
});

export async function POST(request: Request) {
  try {
    console.log('🔵 [TEST] Inicio del upload');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.log('🔴 [TEST] No hay archivo');
      return NextResponse.json(
        { success: false, error: 'No se proporcionó archivo' },
        { status: 400 }
      );
    }

    console.log(`🔵 [TEST] Archivo recibido: ${file.name}, ${file.size} bytes, tipo: ${file.type}`);
    
    // Convertir a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    console.log(`🔵 [TEST] Buffer creado: ${buffer.length} bytes`);
    
    // Upload directo
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'pollo-feliz/test-manual',
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) {
            console.error('🔴 [TEST] Error Cloudinary:', error);
            reject(error);
          } else {
            console.log('🟢 [TEST] Upload exitoso:', result?.public_id);
            resolve(result);
          }
        }
      ).end(buffer);
    });
    
    const uploadResult = result as any;
    
    return NextResponse.json({
      success: true,
      cloudinaryPath: uploadResult.public_id,
      url: uploadResult.secure_url,
      message: 'Upload exitoso con endpoint de prueba'
    });
    
  } catch (error: any) {
    console.error('🔴 [TEST] Error general:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Error desconocido',
        stack: error.stack
      },
      { status: 500 }
    );
  }
}
