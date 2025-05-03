// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const [usuario, setUsuario] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    setUsuario(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    router.push('/login'); // Redirigir al login después de cerrar sesión
  };

  if (!usuario) return null; // Si no hay usuario, no se muestra el Header

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Sistema</h1>
      <nav className="space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
};

export default Header;
