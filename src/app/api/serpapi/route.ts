import { NextResponse } from 'next/server';

// Proxy route for SerpAPI Google Maps results.
// Usage: GET /api/serpapi?q=YOUR+ADDRESS
// Requires environment variable SERPAPI_KEY to be set (do NOT commit your key).
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';

    const key = process.env.SERPAPI_KEY;
    if (!key) {
      return NextResponse.json({ error: 'SERPAPI_KEY not configured on the server' }, { status: 500 });
    }

    // Build SerpAPI URL. We include the api_key param.
    const url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(q)}&api_key=${encodeURIComponent(key)}`;

    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: 'SerpAPI request failed', details: text }, { status: resp.status });
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
