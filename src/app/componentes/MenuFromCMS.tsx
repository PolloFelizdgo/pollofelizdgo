'use client';

import { useState, useEffect } from 'react';
import { MenuItem, getMenuItems } from '@/lib/menu-local';
import Image from 'next/image';

export default function MenuFromCMS() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMenuItems = async () => {
    setLoading(true);
    const items = await getMenuItems();
    setMenuItems(items);
    setLoading(false);
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay items en el menú disponibles.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Nuestro Menú</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {item.imageUrl && (
              <div className="relative h-64 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-800">
                {item.title}
              </h2>
              
              <div 
                className="text-gray-600 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
