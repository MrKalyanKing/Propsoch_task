import Router from "router";
import balance from "../controllers/balance.controller.js";

const balanceRouter = Router()


balanceRouter.post("/balance/:userId", balance)



export default balanceRouter