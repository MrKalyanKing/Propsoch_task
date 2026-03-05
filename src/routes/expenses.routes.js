import { Router } from "express";
import { expensesController, getExpenseController, updateExpenseController, deleteExpenseController } from "../controllers/expenses.controllers.js";
import errHandler from "../middleware/error.middleware.js";

const routerExpense = Router();

routerExpense.post("/expenses", expensesController)
routerExpense.get("/expenses/:id", getExpenseController)
routerExpense.delete("/expenses/delete/:id", deleteExpenseController)
routerExpense.put("/expenses/update/:id", updateExpenseController)



export default routerExpense