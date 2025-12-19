import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { updateMenuInGitHub, isProduction, isGitHubConfigured } from '@/lib/github';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// Detectar el comando git correcto según el sistema
const getGitCommand = () => {
  return process.platform === 'win32' ? 'git.exe' : 'git';
};

// POST - Hacer commit y push de los cambios
export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const commitMessage = message || 'Update: Cambios desde admin panel';
    
    // En producción (Vercel), usar GitHub API
    if (isProduction) {
      if (!isGitHubConfigured()) {
        return NextResponse.json({
          success: false,
          error: 'GitHub no está configurado',
          hint: 'Configura GITHUB_TOKEN en las variables de entorno de Vercel'
        }, { status: 400 });
      }
      
      // Leer menu.json local (última versión en memoria)
      const MENU_FILE = path.join(process.cwd(), 'data', 'menu.json');
      const menuContent = await fs.readFile(MENU_FILE, 'utf8');
      const menu = JSON.parse(menuContent);
      
      // Actualizar en GitHub
      const result = await updateMenuInGitHub(menu, commitMessage);
      
      return NextResponse.json({
        success: true,
        message: result.message,
        autoDeployInProgress: true,
        hint: 'Los cambios estarán visibles en ~2 minutos'
      });
    }

    // En desarrollo (localhost), omitir git para evitar errores en entornos sin git configurado
    return NextResponse.json({
      success: true,
      skipped: true,
      message: 'Modo desarrollo: cambios guardados en data/menu.json. Haz git commit/push manual si lo necesitas.'
    });

    // En desarrollo (localhost), usar git local
    const git = getGitCommand();
    
    console.log('🔄 Iniciando git commit y push...');
    console.log('Sistema:', process.platform);
    console.log('PATH:', process.env.PATH);
    
    // Opciones de ejecución con PATH extendido
    const execOptions = {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024, // 10MB para evitar stdout maxBuffer
      env: {
        ...process.env,
        PATH: `${process.env.PATH};C:\\Program Files\\Git\\cmd;C:\\Program Files\\Git\\bin`,
        GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME || 'Admin Panel',
        GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL || 'admin@example.com',
        GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME || 'Admin Panel',
        GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL || 'admin@example.com',
      }
    } as const;
    
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
