import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const MENU_FILE = path.join(process.cwd(), 'data', 'menu.json');

// GET - Obtener todos los productos del menú
export async function GET() {
  try {
    const data = await fs.readFile(MENU_FILE, 'utf8');
    const menu = JSON.parse(data);
    
    // Convertir a array plano para facilitar gestión
    const products: any[] = [];
    for (const [category, items] of Object.entries(menu.menu)) {
      if (Array.isArray(items)) {
        items.forEach((item: any) => {
          products.push({
            ...item,
            categoryKey: category
          });
        });
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      products,
      version: menu.version,
      lastUpdated: menu.lastUpdated
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al leer el menú' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo producto
export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    
    // Validar campos requeridos
    if (!newProduct.id || !newProduct.name || !newProduct.cloudinaryPath || !newProduct.category) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    const data = await fs.readFile(MENU_FILE, 'utf8');
    const menu = JSON.parse(data);
    
    // Determinar la categoría en el JSON
    const categoryKey = newProduct.categoryKey || 'complementos';
    
    if (!menu.menu[categoryKey]) {
      menu.menu[categoryKey] = [];
    }
    
    // Verificar ID único
    for (const items of Object.values(menu.menu)) {
      if (Array.isArray(items) && items.some((item: any) => item.id === newProduct.id)) {
        return NextResponse.json(
          { success: false, error: 'El ID ya existe' },
          { status: 400 }
        );
      }
    }
    
    // Agregar producto
    const productData = {
      id: newProduct.id,
      name: newProduct.name,
      description: newProduct.description || '',
      price: newProduct.price || 0,
      cloudinaryPath: newProduct.cloudinaryPath,
      category: newProduct.category,
      bestseller: newProduct.bestseller || false,
      available: newProduct.available !== false
    };
    
    menu.menu[categoryKey].push(productData);
    menu.lastUpdated = new Date().toISOString().split('T')[0];
    
    await fs.writeFile(MENU_FILE, JSON.stringify(menu, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      product: productData,
      message: 'Producto creado exitosamente'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al crear producto' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar producto existente
export async function PUT(request: Request) {
  try {
    const updatedProduct = await request.json();
    
    if (!updatedProduct.id) {
      return NextResponse.json(
        { success: false, error: 'ID requerido' },
        { status: 400 }
      );
    }
    
    const data = await fs.readFile(MENU_FILE, 'utf8');
    const menu = JSON.parse(data);
    
    let found = false;
    
    // Buscar y actualizar el producto
    for (const [category, items] of Object.entries(menu.menu)) {
      if (Array.isArray(items)) {
        const index = items.findIndex((item: any) => item.id === updatedProduct.id);
        if (index !== -1) {
          items[index] = {
            ...items[index],
            name: updatedProduct.name || items[index].name,
            description: updatedProduct.description ?? items[index].description,
            price: updatedProduct.price ?? items[index].price,
            cloudinaryPath: updatedProduct.cloudinaryPath || items[index].cloudinaryPath,
            category: updatedProduct.category || items[index].category,
            bestseller: updatedProduct.bestseller ?? items[index].bestseller,
            available: updatedProduct.available ?? items[index].available
          };
          found = true;
          break;
        }
      }
    }
    
    if (!found) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }
    
    menu.lastUpdated = new Date().toISOString().split('T')[0];
    await fs.writeFile(MENU_FILE, JSON.stringify(menu, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Producto actualizado exitosamente'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al actualizar producto' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requerido' },
        { status: 400 }
      );
    }
    
    const data = await fs.readFile(MENU_FILE, 'utf8');
    const menu = JSON.parse(data);
    
    let found = false;
    
    // Buscar y eliminar el producto
    for (const [category, items] of Object.entries(menu.menu)) {
      if (Array.isArray(items)) {
        const index = items.findIndex((item: any) => item.id === id);
        if (index !== -1) {
          items.splice(index, 1);
          found = true;
          break;
        }
      }
    }
    
    if (!found) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }
    
    menu.lastUpdated = new Date().toISOString().split('T')[0];
    await fs.writeFile(MENU_FILE, JSON.stringify(menu, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al eliminar producto' },
      { status: 500 }
    );
  }
}
