import db from "../db/connectMysqlDB.js";
import { generatePostID } from "../utils/generatePostId.js";

export const sharePost = (req, res) => {
	const { user_id, post_id, description } = req.body;
	const share_id = generatePostID();

	const insertQuery = `
    INSERT INTO shares (share_id, user_id, post_id, description)
    VALUES (?, ?, ?, ?)
  `;

	db.query(
		insertQuery,
		[share_id, user_id, post_id, description],
		(err, result) => {
			if (err) {
				console.error("Error sharing post:", err.message);
				return res.status(500).json({ error: "Failed to share post" });
			}

			res.status(201).json({
				message: "Post shared successfully",
				shareId: share_id,
			});
		}
	);
};

export const getSharedPostsByUser = (req, res) => {
	const { user_id } = req.params; // Extract user_id from request parameters

	const query = `
    SELECT 
      shares.share_id,
      shares.description AS share_description,
      shares.shared_at,
      posts.postID,
      posts.title,
      posts.description AS post_description,
      posts.picture,
      posts.created_at AS post_created_at
    FROM 
      shares
    INNER JOIN 
      posts 
    ON 
      shares.post_id = posts.postID
    WHERE 
      shares.user_id = ?
    ORDER BY 
      shares.shared_at DESC
  `;

	db.query(query, [user_id], (err, results) => {
		if (err) {
			console.error("Error fetching shared posts:", err.message);
			return res.status(500).json({ error: "Failed to fetch shared posts" });
		}

		if (results.length === 0) {
			return res
				.status(404)
				.json({ message: "No shared posts found for this user" });
		}

		res.status(200).json({
			message: "Shared posts retrieved successfully",
			sharedPosts: results,
		});
	});
};
