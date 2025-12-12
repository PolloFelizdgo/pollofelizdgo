import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

/**
 * API para subir imágenes a Cloudinary
 * Método: POST
 * Body: { file: File, folder?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "pollo-feliz";

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    // Convertir el archivo a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Subir a Cloudinary usando upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "auto",
          transformation: [
            { quality: "auto", fetch_format: "auto" }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      data: uploadResult
    });

  } catch (error) {
    console.error("Error al subir imagen a Cloudinary:", error);
    return NextResponse.json(
      { error: "Error al subir la imagen" },
      { status: 500 }
    );
  }
}

/**
 * API para obtener todas las imágenes de una carpeta
 * Método: GET
 * Query: ?folder=pollo-feliz
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "pollo-feliz";

    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 500
    });

    return NextResponse.json({
      success: true,
      images: result.resources
    });

  } catch (error) {
    console.error("Error al obtener imágenes de Cloudinary:", error);
    return NextResponse.json(
      { error: "Error al obtener imágenes" },
      { status: 500 }
    );
  }
}
