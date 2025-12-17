import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Detectar el comando git correcto según el sistema
const getGitCommand = () => {
  return process.platform === 'win32' ? 'git.exe' : 'git';
};

// POST - Hacer commit y push de los cambios
export async function POST(request: Request) {
  try {
    // En producción (Vercel), git no está disponible y no es necesario
    if (process.env.VERCEL) {
      return NextResponse.json({
        success: false,
        error: 'Git sync no disponible en producción',
        hint: 'Los cambios se actualizan automáticamente al hacer push desde localhost'
      }, { status: 400 });
    }

    const { message } = await request.json();
    const commitMessage = message || 'Update: Cambios desde admin panel';
    const git = getGitCommand();
    
    console.log('🔄 Iniciando git commit y push...');
    console.log('Sistema:', process.platform);
    console.log('PATH:', process.env.PATH);
    
    // Opciones de ejecución con PATH extendido
    const execOptions = {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PATH: `${process.env.PATH};C:\\Program Files\\Git\\cmd;C:\\Program Files\\Git\\bin`
      }
    };
    
    // Git add
    const { stdout: addOutput } = await execAsync(`${git} add data/menu.json`, execOptions);
    console.log('✅ Git add completado:', addOutput || '(sin output)');
    
    // Git commit
    try {
      const { stdout: commitOutput } = await execAsync(
        `${git} commit -m "${commitMessage}"`, 
        execOptions
      );
      console.log('✅ Git commit completado:', commitOutput);
    } catch (commitError: any) {
      // Si no hay cambios para commitear
      if (commitError.message.includes('nothing to commit') || 
          commitError.stderr?.includes('nothing to commit')) {
        return NextResponse.json({
          success: true,
          message: 'No hay cambios para guardar',
          skipped: true
        });
      }
      throw commitError;
    }
    
    // Git push
    const { stdout: pushOutput } = await execAsync(`${git} push origin main`, execOptions);
    console.log('✅ Git push completado:', pushOutput);
    
    return NextResponse.json({
      success: true,
      message: 'Cambios guardados y subidos a GitHub exitosamente',
      deployed: false,
      info: 'Los cambios se desplegarán automáticamente en Vercel en unos minutos'
    });
    
  } catch (error: any) {
    console.error('❌ Error en git sync:', error);
    console.error('Error completo:', {
      message: error.message,
      stderr: error.stderr,
      stdout: error.stdout,
      code: error.code
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Error al sincronizar con GitHub',
        details: error.stderr || error.stdout || 'Sin detalles adicionales',
        hint: 'Asegúrate de que Git esté instalado y disponible en el PATH del sistema'
      },
      { status: 500 }
    );
  }
}
