import { Router } from "express";

const router = Router();
import {
	getAllUsers,
	getSpecificUser,
	deleteSpecificUser,
	updateUserEmail,
} from "../controllers/admin.controller.js";

router.get("/user", getAllUsers);
router.get("/user/:id", getSpecificUser);
router.put("/user/:id", updateUserEmail);
router.delete("/user/:id", deleteSpecificUser);

export default router;
