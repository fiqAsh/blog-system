import express from "express";
import {
	followUser,
	unfollowUser,
} from "../controllers/following.controller.js";

const router = express.Router();

router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);

export default router;
