'use client';
import { useState } from 'react';

export default function BackupButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleBackup = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/backup', {
        method: 'POST',
      });

      if (!res.ok) {
        const error = await res.json();
        setMessage(error.message || 'Error al realizar el backup');
        return;
      }

      const json = await res.json();
      const formattedJson = JSON.stringify(json, null, 2); // JSON formateado

      const blob = new Blob([formattedJson], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);

      const now = new Date();
      const timestamp = now.toISOString().replace(/[:.]/g, '-');
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${timestamp}.json`;
      a.click();

      window.URL.revokeObjectURL(url);
      setMessage('Backup descargado correctamente');
    } catch (error) {
      setMessage('Error al realizar el backup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleBackup}
        disabled={loading}
        className={`w-full px-4 py-2 rounded-lg text-white font-semibold transition-colors
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Realizando backup...' : 'Hacer Backup'}
      </button>

      {message && (
        <p
          className={`text-sm font-medium ${message.includes('Error') ? 'text-red-600' : 'text-green-600'
            }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
