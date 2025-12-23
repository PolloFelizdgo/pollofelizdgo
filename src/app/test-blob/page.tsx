'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BlobTestResult {
  success: boolean;
  message: string;
  stats?: {
    totalImages: number;
    tokenConfigured: boolean;
  };
  samples?: Array<{
    name: string;
    url: string;
    size: string;
    uploadedAt: string;
  }>;
  error?: string;
}

export default function TestBlobPage() {
  const [result, setResult] = useState<BlobTestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testConnection() {
      try {
        const response = await fetch('/api/test-blob');
        const data = await response.json();
        setResult(data);
      } catch (error) {
        setResult({
          success: false,
          message: '❌ Error al llamar a la API',
          error: error instanceof Error ? error.message : 'Error desconocido'
        });
      } finally {
        setLoading(false);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-8">
          🧪 Prueba de Conexión - Vercel Blob Storage
        </h1>

        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando conexión...</p>
          </div>
        )}

        {!loading && result && (
          <div className="space-y-6">
            {/* Estado de conexión */}
            <div className={`rounded-lg shadow-lg p-6 ${
              result.success ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
            }`}>
              <h2 className="text-2xl font-bold mb-2">
                {result.success ? '✅ Conexión Exitosa' : '❌ Error de Conexión'}
              </h2>
              <p className="text-lg">{result.message}</p>
              
              {result.error && (
                <div className="mt-4 p-4 bg-red-100 rounded border border-red-300">
                  <p className="font-mono text-sm text-red-800">{result.error}</p>
                </div>
              )}
            </div>

            {/* Estadísticas */}
            {result.stats && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">📊 Estadísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded">
                    <p className="text-sm text-gray-600">Total de Imágenes</p>
                    <p className="text-3xl font-bold text-blue-600">{result.stats.totalImages}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded">
                    <p className="text-sm text-gray-600">Token Configurado</p>
                    <p className="text-3xl font-bold text-green-600">
                      {result.stats.tokenConfigured ? '✓' : '✗'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Muestras de imágenes */}
            {result.samples && result.samples.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">🖼️ Imágenes de Muestra</h3>
                <div className="space-y-4">
                  {result.samples.map((sample, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start gap-4">
                        {/* Preview de la imagen */}
                        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          <Image
                            src={sample.url}
                            alt={sample.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        
                        {/* Información */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{sample.name}</p>
                          <p className="text-sm text-gray-600 mt-1">Tamaño: {sample.size}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Subido: {new Date(sample.uploadedAt).toLocaleString('es-MX')}
                          </p>
                          <a 
                            href={sample.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                          >
                            Ver URL completa →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Logo de prueba */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">🎨 Logo desde Vercel Blob</h3>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md h-32">
                  <Image
                    src="https://ji4rgwutdaqrt9bs.public.blob.vercel-storage.com/logo-pollo-feliz.png"
                    alt="Logo Pollo Feliz"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Si ves el logo arriba, la integración está funcionando correctamente
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
