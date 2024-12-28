import express from "express";
import { protectRoute } from "../utils/protectRoute.js";

import {
	createComment,
	getComments,
	deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:postID", protectRoute, createComment);
router.get("/:postID", protectRoute, getComments);
router.delete("/:commentId", protectRoute, deleteComment);

export default router;
