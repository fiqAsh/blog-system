import express from "express";
import { protectRoute } from "../utils/protectRoute.js";

import {
	sharePost,
	getSharedPostsByUser,
} from "../controllers/share.controller.js";

const router = express.Router();

router.post("/", protectRoute, sharePost);
router.get("/:user_id", protectRoute, getSharedPostsByUser);

export default router;
