import { Router } from "express";
import { userRegisterController } from "../controllers/users.controllers.js";
import errHandler from "../middleware/error.middleware.js";

const router = Router();

router.post("/user/register", userRegisterController, errHandler)

export default router
