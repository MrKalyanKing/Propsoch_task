import { Router } from "express";
import { expensesController, getExpenseController, updateExpenseController } from "../controllers/expenses.controllers.js";
import errHandler from "../middleware/error.middleware.js";

const routerExpense = Router();

routerExpense.post("/expenses", expensesController, errHandler)
routerExpense.get("/expenses/:id", getExpenseController, errHandler)
routerExpense.put("/expenses/update/:id", updateExpenseController, errHandler)



export default routerExpense