import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Server route: scan public/imagenes and return available variants grouped by base name.
export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "imagenes");
    const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];

    const map: Record<string, { default?: string; srcSet?: string }> = {};

    // Collect variants by base name
    const variants: Record<string, { name: string; width?: number }[]> = {};

    for (const f of files) {
      // support jpg/png/webp and svg placeholders
      const m = f.match(/^(.+?)(?:-(\d+))?\.(jpe?g|png|webp|svg)$/i);
      if (!m) continue;
      const base = m[1];
      const width = m[2] ? Number(m[2]) : undefined;
      variants[base] = variants[base] || [];
      variants[base].push({ name: f, width });
    }

    for (const base of Object.keys(variants)) {
      const items = variants[base];
      // sort by width ascending (undefined last)
      items.sort((a, b) => {
        if (a.width == null) return 1;
        if (b.width == null) return -1;
        return a.width - b.width;
      });

      // Build a default URL and srcSet per extension to allow <picture> sources
      const byExt: Record<string, { name: string; width?: number }[]> = {};
      for (const it of items) {
        const ext = (it.name.match(/\.([^.]+)$/) || [])[1] || "";
        byExt[ext] = byExt[ext] || [];
        byExt[ext].push(it);
      }

      let defaultUrl: string | undefined = undefined;
      // choose a sensible default: prefer jpg/png over webp/svg when available
      const preferOrder = ["jpg", "jpeg", "png", "webp", "svg"];
      for (const ext of preferOrder) {
        const group = byExt[ext];
        if (group && group.length) {
          // prefer plain file (no width) as default, otherwise largest
          const plain = group.find((g) => g.width == null);
          const chosen = plain ?? group[group.length - 1];
          defaultUrl = `/imagenes/${chosen.name}`;
          break;
        }
      }
      // fallback pick any
      if (!defaultUrl && items.length) defaultUrl = `/imagenes/${items[items.length - 1].name}`;

      const extSrcSets: Record<string, string | undefined> = {};
      for (const ext of Object.keys(byExt)) {
        const group = byExt[ext];
        if (!group) continue;
        const parts: string[] = [];
        for (const it of group) {
          const url = `/imagenes/${it.name}`;
          if (it.width) parts.push(`${url} ${it.width}w`);
        }
        extSrcSets[ext] = parts.length ? parts.join(", ") : undefined;
      }

      map[base] = {
        default: defaultUrl,
        srcSet: undefined,
        // include format-specific srcsets under keys like webp, jpg, png, svg
        // e.g. map[base]["webp"] = "... 320w, ... 640w"
        ...(Object.keys(extSrcSets).length ? extSrcSets : {}),
      } as any;
    }

    return NextResponse.json(map, {
      headers: {
        // Cache this manifest for one day and allow stale while revalidate
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
}
