import db from "../db/connectMysqlDB.js";
import { generatePostID } from "../utils/generatePostId.js";

export const followUser = (req, res) => {
	const followid = generatePostID();
	const { user_id, following_user_id } = req.body;

	if (user_id === following_user_id) {
		return res.status(400).json({ error: "You cannot follow yourself." });
	}

	const query = `INSERT INTO following (followid,user_id, following_user_id) VALUES (?, ?, ?)`;

	db.query(query, [followid, user_id, following_user_id], (err, result) => {
		if (err) {
			console.error("Error following user:", err.message);
			return res.status(500).json({ error: "Failed to follow user" });
		}

		res.status(201).json({ message: "User followed successfully" });
	});
};

export const unfollowUser = (req, res) => {
	const { user_id, following_user_id } = req.body;

	const query = `DELETE FROM following WHERE user_id = ? AND following_user_id = ?`;

	db.query(query, [user_id, following_user_id], (err, result) => {
		if (err) {
			console.error("Error unfollowing user:", err.message);
			return res.status(500).json({ error: "Failed to unfollow user" });
		}

		if (result.affectedRows === 0) {
			return res
				.status(404)
				.json({ error: "Following relationship not found" });
		}

		res.status(200).json({ message: "User unfollowed successfully" });
	});
};
