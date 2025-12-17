import { Octokit } from '@octokit/rest';

/**
 * GitHub API Helper
 * Permite actualizar menu.json directamente en GitHub
 * Usado en producción (Vercel) donde el filesystem es read-only
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'PolloFelizdgo';
const GITHUB_REPO = process.env.GITHUB_REPO || 'pollofelizdgo';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

export const isProduction = !!process.env.VERCEL;

/**
 * Obtener contenido de menu.json desde GitHub
 */
export async function getMenuFromGitHub() {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN no configurado');
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    const { data } = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: 'data/menu.json',
      ref: GITHUB_BRANCH,
    });

    if ('content' in data) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return {
        menu: JSON.parse(content),
        sha: data.sha,
      };
    }

    throw new Error('No se pudo obtener el contenido del archivo');
  } catch (error: any) {
    console.error('Error obteniendo menu.json desde GitHub:', error);
    throw new Error(`Error de GitHub: ${error.message}`);
  }
}

/**
 * Actualizar menu.json en GitHub
 */
export async function updateMenuInGitHub(
  menuContent: any,
  commitMessage: string = 'Update: Cambios desde admin panel'
) {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN no configurado');
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    // Obtener SHA actual del archivo
    const { sha } = await getMenuFromGitHub();

    // Actualizar archivo
    const content = JSON.stringify(menuContent, null, 2);
    const contentEncoded = Buffer.from(content).toString('base64');

    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: 'data/menu.json',
      message: commitMessage,
      content: contentEncoded,
      sha,
      branch: GITHUB_BRANCH,
    });

    console.log('✅ Archivo actualizado en GitHub:', data.commit.sha);

    return {
      success: true,
      commit: data.commit.sha,
      message: 'Cambios guardados. Vercel desplegará automáticamente en ~2 minutos',
    };
  } catch (error: any) {
    console.error('Error actualizando menu.json en GitHub:', error);
    throw new Error(`Error de GitHub: ${error.message}`);
  }
}

/**
 * Verificar si GitHub está configurado correctamente
 */
export function isGitHubConfigured() {
  return !!(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO);
}
