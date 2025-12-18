import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Subir imagen localmente a /public/uploads
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se proporcionó archivo' },
        { status: 400 }
      );
    }

    // Limitar tamaño (50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'La imagen supera 50MB' },
        { status: 400 }
      );
    }

    // Generar nombre de archivo seguro
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${safeName}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const publicPath = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      cloudinaryPath: publicPath, // mantenemos la propiedad para compatibilidad con el panel
      url: publicPath,
      size: file.size,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error al subir imagen' },
      { status: 500 }
    );
  }
}

// DELETE - borrar archivo local en /public/uploads
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicPath = searchParams.get('publicId');

    if (!publicPath) {
      return NextResponse.json(
        { success: false, error: 'publicId requerido' },
        { status: 400 }
      );
    }

    if (!publicPath.startsWith('/uploads/')) {
      return NextResponse.json(
        { success: false, error: 'Solo se pueden borrar archivos en /uploads' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''));
    await fs.unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error al eliminar imagen' },
      { status: 500 }
    );
  }
}
