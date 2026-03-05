import Router from "express";
import balance from "../controllers/balance.controller.js";

const balanceRouter = Router()

balanceRouter.post("/balance/:userId", balance)

export default balanceRouter