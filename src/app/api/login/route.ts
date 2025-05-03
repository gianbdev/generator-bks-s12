// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function POST(req: Request) {
  const { username } = await req.json(); // Recibir solo el nombre de usuario

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input('user', username)
      .query('SELECT * FROM usuario WHERE nom_usu = @user'); // Solo consulta por 'nom_usu'

    if (result.recordset.length === 1) {
      // Si se encuentra un usuario, se considera un login exitoso
      return NextResponse.json({ success: true });
    } else {
      // Si no se encuentra, es un login inválido
      return NextResponse.json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
}
