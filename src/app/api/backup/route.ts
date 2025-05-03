// app/api/backup/route.ts
import { NextRequest } from 'next/server';
import sql from 'mssql';

export async function POST(req: NextRequest) {
  let pool: sql.ConnectionPool | null = null;

  try {
    pool = await sql.connect({
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      server: process.env.DB_SERVER!,
      database: process.env.DB_DATABASE!,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    });

    const result = await pool.request().execute('SP_SimularBackupJson2');
    const json = result.recordset[0]?.SimulacionBackupJson;

    if (!json) {
      return new Response(JSON.stringify({ message: 'No se pudo generar el backup' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(json, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename=backup.json',
      },
    });
  } catch (error) {
    console.error('Error en el backup:', error);
    return new Response(JSON.stringify({ message: 'Error al ejecutar el backup' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    if (pool) await pool.close();
  }
}
