import mysql from "mysql2/promise";


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 14469,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, //  // 10 seconds
});
(async () => {
    try {
      const [rows] = await db.query("SELECT 1");
      console.log("✅ Database connection successful:", rows);
    } catch (error) {
      console.error("❌ Database connection error:", error.message);
    }
  })();
export default db;
