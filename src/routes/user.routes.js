import Router from "router"
import app from "../index.js";
import errHandler from "../middleware/error.middleware.js";
import { userRegisterController } from "../controllers/users.controllers.js";

const router = Router();

router.post("/user/register", userRegisterController, errHandler)

export default router
