import express from "express";
import {
	signup,
	login,
	logout,
	getCurrentUser,
	getAllUsers,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../utils/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getCurrentUser);
router.get("/users", protectRoute, getAllUsers); // New route to fetch all users

export default router;
