import express from "express"
import router from "./routes/user.routes.js";
import { expensesController } from "./controllers/expenses.controllers.js";
import routerExpense from "./routes/expenses.routes.js";


const app = express();

//middleware

app.use(express.json())

app.use("/api", router)
app.use("/api", routerExpense)

export default app;