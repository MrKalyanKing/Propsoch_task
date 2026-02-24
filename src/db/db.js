import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

let Db_Connection
try {
    Db_Connection = await mysql.createConnection({
        host: "localhost",
        user: process.env.USER,
        password: process.env.DBPASS,
        database: "splitwise_app",
    })
    console.log("DB connected")
} catch (err) {
    console.log("Err in DB Connection")
}


export default Db_Connection