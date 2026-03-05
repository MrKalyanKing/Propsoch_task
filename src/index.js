import express from "express"
import router from "./routes/user.routes.js";
import routerExpense from "./routes/expenses.routes.js";
import balanceRouter from "./routes/balance.routes.js";
import errHandler from "./middleware/error.middleware.js";


const app = express();

//middleware

app.use(express.json())

app.use("/api",errHandler, router)
app.use("/api",errHandler, routerExpense)
app.use("/api",errHandler, balanceRouter)

export default app;