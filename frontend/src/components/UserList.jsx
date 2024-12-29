import React from "react";
import "./UserList.css";

const UserList = ({ users }) => {
	return (
		<div className="user-list">
			<h3>Users</h3>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.username}</li>
				))}
			</ul>
		</div>
	);
};

export default UserList;
