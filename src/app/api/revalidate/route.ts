import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * API Route for on-demand revalidation
 * 
 * Usage: POST /api/revalidate?secret=YOUR_SECRET&path=/menu
 * 
 * Se puede llamar desde cualquier panel/admin para forzar la revalidación
 * cuando cambie el menú local o assets en /public.
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }

  if (!path) {
    return NextResponse.json(
      { message: 'Missing path parameter' },
      { status: 400 }
    );
  }

  try {
    // Revalidate the specified path
    revalidatePath(path);

    return NextResponse.json(
      { revalidated: true, path },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}
