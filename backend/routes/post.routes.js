import express from "express";

import {
	createPost,
	getPost,
	updatePost,
	deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

export default router;
