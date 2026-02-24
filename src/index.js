import express from "express"
import router from "./routes/user.routes.js";


const app = express();

//middleware

app.use(express.json())

app.use("/api", router)

export default app;