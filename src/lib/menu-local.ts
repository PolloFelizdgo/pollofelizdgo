export interface MenuItem {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number | null;
  imageUrl: string;
  bestseller: boolean;
  available: boolean;
}

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

function buildApiBase(): string {
  if (typeof window !== 'undefined') return '';
  return DEFAULT_SITE_URL.replace(/\/$/, '');
}

function normalizeImagePath(path?: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return path;
  return `/${path}`;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const base = buildApiBase();
  const res = await fetch(`${base}/api/menu`, { cache: 'no-store' });
  if (!res.ok) return [];

  const data = await res.json();
  const products = Array.isArray(data.products) ? data.products : [];

  return products
    .filter((p: any) => p)
    .map((p: any) => ({
      id: String(p.id ?? ''),
      title: p.name ?? '',
      description: p.description ?? '',
      category: p.category ?? 'Otros',
      price: typeof p.price === 'number' ? p.price : p.price ? Number(p.price) : null,
      imageUrl: normalizeImagePath(p.cloudinaryPath || p.image || p.imageUrl),
      bestseller: Boolean(p.bestseller),
      available: p.available !== false,
    }))
    .filter((p: MenuItem) => p.id && p.title);
}
