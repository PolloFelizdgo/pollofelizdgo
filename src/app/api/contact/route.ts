import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs'; // Allow fs access

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, apellidos, celular, correo } = body;

    if (!nombre || !apellidos || !celular || !correo) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    // Ensure directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Read existing
    let existing: any[] = [];
    try {
      const raw = await fs.readFile(CONTACTS_FILE, 'utf-8');
      existing = JSON.parse(raw || '[]');
    } catch (e) {
      existing = [];
    }

    const newEntry = {
      id: Date.now(),
      nombre,
      apellidos,
      celular,
      correo,
      createdAt: new Date().toISOString(),
    };

    existing.push(newEntry);
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(existing, null, 2), 'utf-8');

    return NextResponse.json({ ok: true, entry: newEntry }, { status: 201 });
  } catch (_err: any) {
    // avoid leaking internal error details in logs; return generic error to client
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
