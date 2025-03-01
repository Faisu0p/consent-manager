import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Ensure encryption setting is respected
    trustServerCertificate: true, // Use only in development
  },
};

// Function to create a database connection pool
const connectDB = async () => {
  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();
    console.log('✅ Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('❌ Database Connection Failed:', err);
    return null; // Return null instead of exiting the process
  }
};

export default connectDB;
