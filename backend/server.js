import express from "express";

import db from "./db/connectMysqlDB.js";
import authroutes from "./routes/auth.routes.js";
import postroutes from "./routes/post.routes.js";
import boostedroutes from "./routes/boosted.routes.js";
import commentroutes from "./routes/comment.route.js";
import shareroutes from "./routes/share.routes.js";
import followroutes from "./routes/follow.routes.js";
//import createUsersTable from "./models/user.model.js";
//import createPostsTable from "./models/post.model.js";
// import createReactionsTable from "./models/reaction.model.js";
//import createBoostedPostsTable from "./models/boosted.post.model.js";
//import createCommentsTable from "./models/comment.model.js";
// import createSharesTable from "./models/share.model.js";
// import createFollowingTable from "./models/following.model.js";

// createFollowingTable();

// createSharesTable();

//createCommentsTable();

//createBoostedPostsTable();

// createReactionsTable();
//createPostsTable();

//createUsersTable();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("server is running");
});

app.use("/api/auth", authroutes);
app.use("/api/posts", postroutes);
app.use("/api/boosted", boostedroutes);
app.use("/api/comments", commentroutes);
app.use("/api/shares", shareroutes);
app.use("/api/following", followroutes);
const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);

	// Test the database connection
	db.connect((err) => {
		if (err) {
			console.error("Error connecting to the database:", err.message);
		} else {
			console.log("Connected to the database successfully!");
		}
	});
});
