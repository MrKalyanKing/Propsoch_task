import { Router } from "express";
import { userRegisterController, getUserProfileController, updateUserProfileController } from "../controllers/users.controllers.js";
import errHandler from "../middleware/error.middleware.js";

const router = Router();

router.post("/user/register", userRegisterController, errHandler)
router.get("/user/profile/:userId", getUserProfileController, errHandler)
router.put("/user/update/:userId", updateUserProfileController, errHandler)

export default router
