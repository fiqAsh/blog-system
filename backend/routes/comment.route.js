import express from "express";

import {
	createComment,
	getComments,
	deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:postID", createComment);
router.get("/:postID", getComments);
router.delete("/:commentId", deleteComment);

export default router;
