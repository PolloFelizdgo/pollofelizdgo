"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  cloudinaryPath: string;
  category: string;
  categoryKey?: string;
  bestseller?: boolean;
  available?: boolean;
}

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    id: "",
    name: "",
    description: "",
    price: 0,
    cloudinaryPath: "",
    category: "Promoción",
    categoryKey: "promociones",
    bestseller: false,
    available: true
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
      loadProducts();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Password simple - en producción usar algo más seguro
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "pollofeliz2025") {
      sessionStorage.setItem("admin_auth", "authenticated");
      setIsAuthenticated(true);
      loadProducts();
    } else {
      setMessage({ type: 'error', text: 'Contraseña incorrecta' });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cargar productos' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setMessage({ type: 'error', text: 'Solo se permiten imágenes JPG, PNG o WEBP' });
      e.target.value = ''; // Limpiar input
      return;
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      setMessage({ type: 'error', text: 'La imagen no debe superar 5MB' });
      e.target.value = ''; // Limpiar input
      return;
    }

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('folder', 'pollo-feliz/menu');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });
      const data = await res.json();
      
      if (data.success) {
        setFormData(prev => ({ ...prev, cloudinaryPath: data.cloudinaryPath }));
        setMessage({ type: 'success', text: '✅ Imagen subida exitosamente' });
        // Limpiar el input para permitir subir la misma imagen de nuevo si se borra
        e.target.value = '';
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al subir imagen' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al subir imagen. Verifica tu conexión.' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que haya imagen al crear producto nuevo
    if (!editingProduct && !formData.cloudinaryPath) {
      setMessage({ type: 'error', text: '⚠️ Debes subir una imagen del producto' });
      return;
    }

    // Validar campos requeridos
    if (!formData.id || !formData.name || !formData.category) {
      setMessage({ type: 'error', text: '⚠️ Completa todos los campos requeridos (*)' });
      return;
    }
    
    const method = editingProduct ? 'PUT' : 'POST';
    
    try {
      const res = await fetch('/api/menu', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: '✅ ' + data.message });
        loadProducts();
        handleCancel();
      } else {
        setMessage({ type: 'error', text: '❌ ' + data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Error al guardar producto' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const res = await fetch(`/api/menu?id=${id}`, {
        method: 'DELETE'
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Producto eliminado' });
        loadProducts();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar producto' });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsCreating(false);
    setFormData({
      id: "",
      name: "",
      description: "",
      price: 0,
      cloudinaryPath: "",
      category: "Promoción",
      categoryKey: "promociones",
      bestseller: false,
      available: true
    });
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🍗 Panel Admin</h1>
            <p className="text-gray-600">Pollo Feliz - Gestión del Menú</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
            
            {message && message.type === 'error' && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {message.text}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🍗 Panel de Administración</h1>
            <p className="text-sm text-gray-600">Gestión del Menú - Pollo Feliz</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Ver Sitio
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Message Banner */}
      {message && (
        <div className={`${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'} px-4 py-3 text-center`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="ml-4 underline">Cerrar</button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {products.length} Productos en el Menú
          </h2>
          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            + Agregar Producto
          </button>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID único *</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="ej: hamburguesa-especial"
                  required
                  disabled={!!editingProduct}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="ej: Hamburguesa Especial"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Descripción atractiva del producto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio (MXN)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="99.00"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    const cat = e.target.value;
                    const keyMap: any = {
                      'Promoción': 'promociones',
                      'Pollo': 'pollo',
                      'Complementos': 'complementos',
                      'Acompañamientos': 'acompañamientos',
                      'Bebidas': 'bebidas',
                      'Salsas': 'salsas'
                    };
                    setFormData(prev => ({ ...prev, category: cat, categoryKey: keyMap[cat] }));
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option>Promoción</option>
                  <option>Pollo</option>
                  <option>Complementos</option>
                  <option>Acompañamientos</option>
                  <option>Bebidas</option>
                  <option>Salsas</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen * 
                  <span className="text-xs text-gray-500 ml-2">(Recomendado: 1200x900px, máx 5MB)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  {formData.cloudinaryPath ? (
                    <div className="space-y-3">
                      <div className="relative w-48 h-36 mx-auto">
                        <Image
                          src={`https://res.cloudinary.com/dw55kbkmn/image/upload/c_fill,w_400,h_300/${formData.cloudinaryPath}`}
                          alt="Preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="text-sm text-gray-600 break-all">
                        {formData.cloudinaryPath.split('/').pop()}
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, cloudinaryPath: '' }))}
                        className="text-red-600 hover:text-red-700 text-sm underline"
                      >
                        Eliminar y cambiar imagen
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Sube una imagen</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            required={!editingProduct}
                          />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP hasta 5MB</p>
                      {uploadingImage && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                          <span className="text-sm text-blue-600">Subiendo imagen...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.bestseller}
                    onChange={(e) => setFormData(prev => ({ ...prev, bestseller: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Más vendido</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Disponible</span>
                </label>
              </div>

              <div className="md:col-span-2 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingProduct ? 'Actualizar' : 'Crear'} Producto
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={`https://res.cloudinary.com/dw55kbkmn/image/upload/c_fill,w_400,h_300/${product.cloudinaryPath}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {product.bestseller && (
                      <span className="bg-yellow-500 text-xs px-2 py-1 rounded">⭐ Best</span>
                    )}
                    {!product.available && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">No disponible</span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <span className="text-green-600 font-bold">${product.price?.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                  <p className="text-xs text-gray-500 mb-3">Categoría: {product.category}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
