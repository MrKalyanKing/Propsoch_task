import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host: "127.0.0.1",
    port: 8080,
    user: process.env.USER,
    password: process.env.DBPASS,
    database: "splitwise_app",
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
