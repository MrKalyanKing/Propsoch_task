import { Router } from "express";
import { userRegisterController, getUserProfileController, updateUserProfileController } from "../controllers/users.controllers.js";
import errHandler from "../middleware/error.middleware.js";

const router = Router();

router.post("/user/register", userRegisterController)
router.get("/user/profile/:userId", getUserProfileController)
router.put("/user/update/:userId", updateUserProfileController)

export default router
