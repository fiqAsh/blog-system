import express from "express";
import { protectRoute } from "../utils/protectRoute.js";

import {
	followUser,
	unfollowUser,
} from "../controllers/following.controller.js";

const router = express.Router();

router.post("/follow/:following_user_id", protectRoute, followUser);
router.post("/unfollow/:following_user_id", protectRoute, unfollowUser);

export default router;
