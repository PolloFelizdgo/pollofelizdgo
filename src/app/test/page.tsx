'use client';

import { useState, useEffect } from 'react';

interface DBTestResult {
  success: boolean;
  message?: string;
  database?: {
    version: string;
    database: string;
    user: string;
    responseTime: string;
    tables: string[];
    tableCount: number;
  };
  error?: string;
  details?: string;
}

interface BlobTestResult {
  success: boolean;
  message?: string;
  blobCount?: number;
  sampleUrls?: string[];
  error?: string;
}

export default function TestPage() {
  const [dbResult, setDbResult] = useState<DBTestResult | null>(null);
  const [blobResult, setBlobResult] = useState<BlobTestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const testDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setDbResult(data);
    } catch (error: any) {
      setDbResult({
        success: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testBlob = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-blob');
      const data = await response.json();
      setBlobResult(data);
    } catch (error: any) {
      setBlobResult({
        success: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
          🔧 Pruebas de Conexión - Pollo Feliz
        </h1>

        {/* Test Neon Database */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              🗄️ Neon Database (PostgreSQL)
            </h2>
            <button
              onClick={testDatabase}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Probando...' : 'Probar Conexión'}
            </button>
          </div>

          {dbResult && (
            <div className={`mt-4 p-4 rounded-lg ${dbResult.success ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
              {dbResult.success ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">✅</span>
                    <span className="text-green-700 font-bold text-lg">{dbResult.message}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Base de datos:</strong> {dbResult.database?.database}</p>
                    <p><strong>Usuario:</strong> {dbResult.database?.user}</p>
                    <p><strong>Tiempo de respuesta:</strong> {dbResult.database?.responseTime}</p>
                    <p><strong>Tablas encontradas:</strong> {dbResult.database?.tableCount}</p>
                    {dbResult.database?.tables && dbResult.database.tables.length > 0 && (
                      <div>
                        <p><strong>Tablas:</strong></p>
                        <ul className="list-disc list-inside pl-4">
                          {dbResult.database.tables.map((table, i) => (
                            <li key={i} className="text-gray-700">{table}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <details className="mt-3">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-800">Ver versión de PostgreSQL</summary>
                      <p className="text-xs mt-2 text-gray-600 bg-gray-100 p-2 rounded">{dbResult.database?.version}</p>
                    </details>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">❌</span>
                    <span className="text-red-700 font-bold">Error de conexión</span>
                  </div>
                  <p className="text-red-600 text-sm mb-2">{dbResult.error}</p>
                  {dbResult.details && (
                    <p className="text-xs text-gray-600 bg-red-100 p-2 rounded">{dbResult.details}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Test Vercel Blob */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              📦 Vercel Blob Storage
            </h2>
            <button
              onClick={testBlob}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Probando...' : 'Probar Conexión'}
            </button>
          </div>

          {blobResult && (
            <div className={`mt-4 p-4 rounded-lg ${blobResult.success ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
              {blobResult.success ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">✅</span>
                    <span className="text-green-700 font-bold text-lg">{blobResult.message}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Archivos encontrados:</strong> {blobResult.blobCount}</p>
                    {blobResult.sampleUrls && blobResult.sampleUrls.length > 0 && (
                      <div>
                        <p className="mt-3"><strong>Ejemplos de URLs:</strong></p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                          {blobResult.sampleUrls.map((url, i) => (
                            <li key={i} className="text-xs text-gray-600 break-all">
                              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {url.split('/').pop()}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">❌</span>
                    <span className="text-red-700 font-bold">Error de conexión</span>
                  </div>
                  <p className="text-red-600 text-sm">{blobResult.error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
