import express from "express";

import {
	createPost,
	getPost,
	updatePost,
	deletePost,
	getUserPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPost);
router.get("/:userId", getUserPosts);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

export default router;
