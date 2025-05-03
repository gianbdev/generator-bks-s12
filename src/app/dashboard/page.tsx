'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BackupButton from '../components/BackupButton';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('usuario');

    if (!user) {
      router.push('/login');
    } else {
      window.history.replaceState(null, '', window.location.href);
    }

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.replaceState(null, '', window.location.href);
      router.push('/dashboard');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Encabezado */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido al Dashboard</h1>
          <p className="text-gray-600">Panel principal de administración del sistema</p>
        </section>

        {/* Sección de respaldo */}
        <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Respaldo de Base de Datos</h2>
          <p className="text-gray-600">
            Puedes generar un respaldo completo de la base de datos con el siguiente botón.
          </p>
          <BackupButton />
        </section>

        {/* Sección de sesión */}
        <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Sesión</h2>
          <p className="text-gray-600">
            Puedes cerrar la sesión actual si ya no deseas seguir en el sistema.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('usuario');
              window.location.href = '/login';
            }}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </section>
      </div>
    </div>
  );
}
