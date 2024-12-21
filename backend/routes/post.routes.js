import express from "express";
import { protectRoute } from "../utils/protectRoute.js";

import {
	createPost,
	getPost,
	updatePost,
	deletePost,
	getUserPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", protectRoute, createPost);
router.get("/", protectRoute, getPost);
router.get("/:userID", protectRoute, getUserPosts);
router.put("/:postID", protectRoute, updatePost);
router.delete("/:postID", protectRoute, deletePost);

export default router;
