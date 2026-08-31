const mysql = require('mysql2/promise');
const config = require('../config/config');

const pool = mysql.createPool({
  connectionLimit: 200,
  waitForConnections: true,
  queueLimit: 0,
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  dateStrings: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

async function verifyConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.ping();
    console.log('Database connected successfully.');
  } catch (err) {
    switch (err.code) {
      case 'PROTOCOL_CONNECTION_LOST':
        console.error('Database connection was closed.');
        break;
      case 'ER_CON_COUNT_ERROR':
        console.error('Database has too many connections.');
        break;
      case 'ECONNREFUSED':
        console.error('Database connection was refused.');
        break;
      default:
        console.error('Database connection error:', err.message);
    }
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
}

async function closePool() {
  try {
    await pool.end();
    console.log('Database pool closed gracefully.');
  } catch (err) {
    console.error('Error closing database pool:', err.message);
  }
}

process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});

verifyConnection();

module.exports = pool;

