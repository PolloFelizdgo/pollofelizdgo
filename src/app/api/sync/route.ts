import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// POST - Hacer commit y push de los cambios
export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const commitMessage = message || 'Update: Cambios desde admin panel';
    
    console.log('🔄 Iniciando git commit y push...');
    
    // Git add
    await execAsync('git add data/menu.json');
    console.log('✅ Git add completado');
    
    // Git commit
    try {
      const { stdout: commitOutput } = await execAsync(`git commit -m "${commitMessage}"`);
      console.log('✅ Git commit completado:', commitOutput);
    } catch (commitError: any) {
      // Si no hay cambios para commitear
      if (commitError.message.includes('nothing to commit')) {
        return NextResponse.json({
          success: true,
          message: 'No hay cambios para guardar',
          skipped: true
        });
      }
      throw commitError;
    }
    
    // Git push
    const { stdout: pushOutput } = await execAsync('git push origin main');
    console.log('✅ Git push completado:', pushOutput);
    
    return NextResponse.json({
      success: true,
      message: 'Cambios guardados y subidos a GitHub exitosamente',
      deployed: false,
      info: 'Los cambios se desplegarán automáticamente en Vercel en unos minutos'
    });
    
  } catch (error: any) {
    console.error('❌ Error en git sync:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Error al sincronizar con GitHub',
        details: error.stderr || error.stdout
      },
      { status: 500 }
    );
  }
}
