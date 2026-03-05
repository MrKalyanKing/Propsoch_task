import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();



const pool = mysql.createPool({
    host: process.env.DB_HOST|| "127.0.0.1",
    port:process.env.DB_PORT|| 8080,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME ||"splitwise_app",
    waitForConnections: true,
    connectionLimit: 10,
});

(async () => {
    try {
        await pool.getConnection();
        console.log(" Database connected successfully!");
    } catch (err) {
        console.error(" Database connection failed:", err.message);
        process.exit(1);
    }
})();

export default pool;
