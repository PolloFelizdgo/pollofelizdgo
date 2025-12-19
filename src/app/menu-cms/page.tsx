import { getMenuItems, MenuItem } from '@/lib/menu-local';
import Image from 'next/image';

/**
 * Server Component - Menu with SSR/ISR
 * 
 * This component fetches menu items on the server from the local menu.json
 * through /api/menu.
 */
export default async function MenuPage() {
  const menuItems = await getMenuItems();

  if (menuItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Nuestro Menú</h1>
          <p className="text-gray-600">
            No hay items en el menú disponibles en este momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Nuestro Menú</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map((item: MenuItem, idx: number) => (
          <article
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
                  priority={idx < 3}
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
          </article>
        ))}
      </div>
    </div>
  );
}
