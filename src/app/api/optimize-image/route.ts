import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// API para optimizar y servir imágenes con diferentes tamaños
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imagePath = searchParams.get("path");
    const width = parseInt(searchParams.get("w") || "800");
    const quality = parseInt(searchParams.get("q") || "80");
    const format = searchParams.get("f") || "webp"; // webp, jpeg, png

    if (!imagePath) {
      return NextResponse.json({ error: "Image path required" }, { status: 400 });
    }

    // Construir ruta completa
    const fullPath = path.join(process.cwd(), "public", imagePath);

    // Verificar que el archivo existe
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Leer y optimizar imagen con sharp
    let transformer = sharp(fullPath).resize(width, null, {
      fit: "inside",
      withoutEnlargement: true,
    });

    // Aplicar formato
    if (format === "webp") {
      transformer = transformer.webp({ quality });
    } else if (format === "jpeg" || format === "jpg") {
      transformer = transformer.jpeg({ quality, progressive: true });
    } else if (format === "png") {
      transformer = transformer.png({ quality, progressive: true });
    }

    const buffer = await transformer.toBuffer();

    // Headers de cache agresivo
    return new Response(buffer.buffer as ArrayBuffer, {
      headers: {
        "Content-Type": `image/${format === "jpg" ? "jpeg" : format}`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Image optimization error:", error);
    return NextResponse.json({ error: "Failed to optimize image" }, { status: 500 });
  }
}
