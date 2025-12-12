import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const reviewsFilePath = path.join(process.cwd(), "data", "reviews.json");

// GET - Obtener reseñas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sucursal = searchParams.get("sucursal");

    // Crear archivo si no existe
    try {
      await fs.access(reviewsFilePath);
    } catch {
      await fs.mkdir(path.dirname(reviewsFilePath), { recursive: true });
      await fs.writeFile(reviewsFilePath, JSON.stringify([]));
    }

    const data = await fs.readFile(reviewsFilePath, "utf-8");
    let reviews = JSON.parse(data);

    // Filtrar por sucursal si se especifica
    if (sucursal) {
      reviews = reviews.filter((r: any) => r.sucursal === sucursal);
    }

    // Ordenar por fecha (más recientes primero)
    reviews.sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calcular promedio de rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
      : 0;

    return NextResponse.json({
      reviews,
      total: reviews.length,
      avgRating: avgRating.toFixed(1)
    });
  } catch (error) {
    console.error("Error al obtener reviews:", error);
    return NextResponse.json(
      { error: "Error al obtener reseñas" },
      { status: 500 }
    );
  }
}

// POST - Crear nueva reseña
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sucursal, name, rating, comment, date } = body;

    // Validar campos requeridos
    if (!sucursal || !name || !rating || !comment) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Validar rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating debe estar entre 1 y 5" },
        { status: 400 }
      );
    }

    // Crear archivo si no existe
    try {
      await fs.access(reviewsFilePath);
    } catch {
      await fs.mkdir(path.dirname(reviewsFilePath), { recursive: true });
      await fs.writeFile(reviewsFilePath, JSON.stringify([]));
    }

    // Leer reviews existentes
    const data = await fs.readFile(reviewsFilePath, "utf-8");
    const reviews = JSON.parse(data);

    // Agregar nueva review
    const newReview = {
      id: Date.now(),
      sucursal,
      name,
      rating,
      comment,
      date: date || new Date().toISOString()
    };

    reviews.push(newReview);

    // Guardar
    await fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2));

    return NextResponse.json(
      { message: "Reseña guardada exitosamente", review: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al guardar review:", error);
    return NextResponse.json(
      { error: "Error al guardar reseña" },
      { status: 500 }
    );
  }
}
