import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    // Verificar que la variable de entorno existe
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      return NextResponse.json({
        success: false,
        error: 'DATABASE_URL no configurado'
      }, { status: 500 });
    }

    // Crear conexión
    const sql = neon(databaseUrl);
    
    // Ejecutar query de prueba
    const startTime = Date.now();
    const result = await sql`SELECT version(), current_database(), current_user`;
    const responseTime = Date.now() - startTime;

    // Obtener lista de tablas
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    return NextResponse.json({
      success: true,
      message: 'Conexión exitosa a Neon Database',
      database: {
        version: result[0].version,
        database: result[0].current_database,
        user: result[0].current_user,
        responseTime: `${responseTime}ms`,
        tables: tables.map(t => t.table_name),
        tableCount: tables.length
      }
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
}
