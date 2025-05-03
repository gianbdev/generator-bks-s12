import sql from 'mssql'

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'ventas-dbaut.mssql.somee.com',
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // true si usas Azure
    trustServerCertificate: true
  }
};

export async function connectDB() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('DB Connection Failed:', err);
    throw err;
  }
}
