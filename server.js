import pool from "./src/db/db.js";
import Db_Connection from "./src/db/db.js";
import app from "./src/index.js";
import dotenv from "dotenv"

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})