import { Router } from "express";
import { expensesController } from "../controllers/expenses.controllers.js";
import errHandler from "../middleware/error.middleware.js";

const routerExpense = Router();

routerExpense.post("/expenses", expensesController, errHandler)


export default routerExpense