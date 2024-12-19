import db from "../db/connectMysqlDB.js";
import { generatePostID } from "../utils/generatePostId.js";

export const boostPost = (req, res) => {
	const { postID, duration } = req.body;
	const boostedID = generatePostID();

	const insertQuery = `
        INSERT INTO boosted_posts (boostedID,postID, duration)
        VALUES (?, ?, ?)
    `;

	db.query(insertQuery, [boostedID, postID, duration], (err, result) => {
		if (err) {
			console.error("Error boosting post:", err.message);
			return res.status(500).json({ error: "Failed to boost post" });
		}

		res.status(201).json({
			message: "Post boosted successfully",
			boostedID: boostedID,
		});
	});
};

export const getBoostedPosts = (req, res) => {
	const query = `
    SELECT bp.boostedID, bp.postID, bp.duration, bp.boosted_at, p.title, p.description, p.picture
    FROM boosted_posts bp
    INNER JOIN posts p ON bp.postID = p.postID
    WHERE TIMESTAMPADD(HOUR, bp.duration, bp.boosted_at) > NOW()
    `;

	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching boosted posts:", err.message);
			return res.status(500).json({ error: "Failed to fetch boosted posts" });
		}

		res.status(200).json(results);
	});
};
