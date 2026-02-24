import Router from "router";
import { expensesController } from "../controllers/expenses.controllers";
import errHandler from "../middleware/error.middleware";

const router = Router();

router.post("/expenses", expensesController, errHandler)

export default router