import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const ordersFilePath = path.join(process.cwd(), "data", "orders.json");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Crear archivo si no existe
    try {
      await fs.access(ordersFilePath);
    } catch {
      await fs.mkdir(path.dirname(ordersFilePath), { recursive: true });
      await fs.writeFile(ordersFilePath, JSON.stringify([]));
    }

    // Leer pedidos existentes
    const data = await fs.readFile(ordersFilePath, "utf-8");
    const orders = JSON.parse(data);

    // Agregar nuevo pedido
    const newOrder = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);

    // Guardar
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));

    return NextResponse.json(
      { message: "Pedido guardado exitosamente", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al guardar pedido:", error);
    return NextResponse.json(
      { error: "Error al guardar pedido" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    try {
      await fs.access(ordersFilePath);
    } catch {
      return NextResponse.json({ orders: [], total: 0 });
    }

    const data = await fs.readFile(ordersFilePath, "utf-8");
    const orders = JSON.parse(data);

    return NextResponse.json({
      orders,
      total: orders.length
    });
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    return NextResponse.json(
      { error: "Error al obtener pedidos" },
      { status: 500 }
    );
  }
}
