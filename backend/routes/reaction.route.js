import express from "express";
import {
	reactToPost,
	getReactionsForPost,
} from "../controllers/reaction.controller.js";

const router = express.Router();

router.post("/", reactToPost);
router.get("/:postID", getReactionsForPost);

export default router;
