#!/usr/bin/env node

/**
 * Script para validar y sincronizar el menú con Cloudinary
 * 
 * Uso:
 * node scripts/validate-menu.js           - Valida el JSON del menú
 * node scripts/validate-menu.js --check   - Verifica imágenes en Cloudinary
 * node scripts/validate-menu.js --sync    - Sincroniza y actualiza
 */

const fs = require('fs');
const path = require('path');

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Validar estructura del JSON
function validateMenuJSON() {
  log('\n🔍 Validando estructura del menú...', 'cyan');
  
  try {
    const menuPath = path.join(process.cwd(), 'data', 'menu.json');
    
    if (!fs.existsSync(menuPath)) {
      log('❌ Error: No se encontró el archivo data/menu.json', 'red');
      return false;
    }
    
    const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf8'));
    
    // Validar campos requeridos
    if (!menuData.version || !menuData.menu) {
      log('❌ Error: Faltan campos requeridos (version, menu)', 'red');
      return false;
    }
    
    log('✅ Estructura básica válida', 'green');
    
    // Contar productos
    let totalProducts = 0;
    let missingImages = [];
    let duplicateIds = new Set();
    const allIds = new Set();
    
    for (const [category, items] of Object.entries(menuData.menu)) {
      log(`\n📁 Categoría: ${category}`, 'blue');
      
      items.forEach(item => {
        totalProducts++;
        
        // Validar ID único
        if (allIds.has(item.id)) {
          duplicateIds.add(item.id);
          log(`  ⚠️  ID duplicado: ${item.id}`, 'yellow');
        }
        allIds.add(item.id);
        
        // Validar campos requeridos
        if (!item.cloudinaryPath) {
          missingImages.push(`${item.name} (${item.id})`);
          log(`  ❌ Sin imagen: ${item.name}`, 'red');
        } else {
          log(`  ✓ ${item.name} - $${item.price || 'N/A'}`, 'green');
        }
      });
    }
    
    // Resumen
    log('\n📊 Resumen:', 'cyan');
    log(`  Total productos: ${totalProducts}`, 'blue');
    log(`  Categorías: ${Object.keys(menuData.menu).length}`, 'blue');
    
    if (missingImages.length > 0) {
      log(`  ⚠️  Productos sin imagen: ${missingImages.length}`, 'yellow');
      missingImages.forEach(img => log(`    - ${img}`, 'yellow'));
    }
    
    if (duplicateIds.size > 0) {
      log(`  ❌ IDs duplicados: ${duplicateIds.size}`, 'red');
      return false;
    }
    
    log('\n✅ Validación completada exitosamente', 'green');
    return true;
    
  } catch (error) {
    log(`❌ Error al validar: ${error.message}`, 'red');
    return false;
  }
}

// Sincronizar con código TypeScript
function syncWithTypeScript() {
  log('\n🔄 Sincronizando con platos.ts...', 'cyan');
  
  try {
    const menuPath = path.join(process.cwd(), 'data', 'menu.json');
    const platosPath = path.join(process.cwd(), 'src', 'app', 'data', 'platos.ts');
    
    const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf8'));
    
    // Generar array de platos desde JSON
    const platos = [];
    for (const items of Object.values(menuData.menu)) {
      items.forEach(item => {
        if (item.available !== false) {
          platos.push({
            name: item.name,
            imageBase: item.cloudinaryPath,
            desc: item.description || '',
            category: item.category || 'Otros',
            price: item.price || null,
            bestseller: item.bestseller || false,
          });
        }
      });
    }
    
    log(`✅ Generados ${platos.length} productos desde JSON`, 'green');
    log('💡 Para usar el JSON, importa desde data/menu.json', 'blue');
    
    return true;
    
  } catch (error) {
    log(`❌ Error al sincronizar: ${error.message}`, 'red');
    return false;
  }
}

// Generar reporte
function generateReport() {
  log('\n📄 Generando reporte del menú...', 'cyan');
  
  try {
    const menuPath = path.join(process.cwd(), 'data', 'menu.json');
    const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf8'));
    
    const report = {
      fecha: new Date().toISOString(),
      version: menuData.version,
      categorias: {},
      estadisticas: {
        totalProductos: 0,
        conPrecio: 0,
        bestsellers: 0,
        disponibles: 0,
      }
    };
    
    for (const [category, items] of Object.entries(menuData.menu)) {
      report.categorias[category] = items.length;
      items.forEach(item => {
        report.estadisticas.totalProductos++;
        if (item.price) report.estadisticas.conPrecio++;
        if (item.bestseller) report.estadisticas.bestsellers++;
        if (item.available !== false) report.estadisticas.disponibles++;
      });
    }
    
    const reportPath = path.join(process.cwd(), 'data', 'menu-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    log('✅ Reporte generado en data/menu-report.json', 'green');
    log('\n📊 Estadísticas:', 'cyan');
    log(`  Total: ${report.estadisticas.totalProductos}`, 'blue');
    log(`  Disponibles: ${report.estadisticas.disponibles}`, 'green');
    log(`  Bestsellers: ${report.estadisticas.bestsellers}`, 'yellow');
    
    return true;
    
  } catch (error) {
    log(`❌ Error al generar reporte: ${error.message}`, 'red');
    return false;
  }
}

// Main
const args = process.argv.slice(2);
const command = args[0];

log('🍗 Validador de Menú - Pollo Feliz', 'cyan');
log('==================================\n', 'cyan');

switch (command) {
  case '--check':
    validateMenuJSON();
    break;
  
  case '--sync':
    if (validateMenuJSON()) {
      syncWithTypeScript();
      generateReport();
    }
    break;
  
  case '--report':
    generateReport();
    break;
  
  default:
    validateMenuJSON();
    log('\n💡 Comandos disponibles:', 'blue');
    log('  node scripts/validate-menu.js --check   - Validar JSON', 'cyan');
    log('  node scripts/validate-menu.js --sync    - Sincronizar todo', 'cyan');
    log('  node scripts/validate-menu.js --report  - Generar reporte', 'cyan');
}
