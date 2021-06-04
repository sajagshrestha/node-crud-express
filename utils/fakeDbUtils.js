import { readFile, writeFile } from "fs";

const filePath = new URL("../jsonDB/users.json", import.meta.url);

//returns all users as js object
export const getUsers = () => {
	return new Promise((resolve, reject) => {
		readFile(filePath, (error, content) => {
			if (error) reject("get users failed");
			resolve(JSON.parse(content));
		});
	});
};

//returns user if found
export const getUserBYEmail = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await getUsers();
			if (users.length === 0) resolve(null);
			let foundUser = null;
			users.forEach((user) => {
				if (email === user.email) {
					foundUser = user;
				}
			});
			resolve(foundUser);
		} catch (err) {
			reject("get user failed");
		}
	});
};

export const getUserByID = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await getUsers();
			if (users.length === 0) resolve(null);
			let foundUser = null;
			users.forEach((user) => {
				if (id === user.id) {
					foundUser = user;
				}
			});
			resolve(foundUser);
		} catch (err) {
			reject("get user failed");
		}
	});
};

export const saveUser = (user) => {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await getUsers();
			users.push(user);
			writeFile(filePath, JSON.stringify(users), (error) => {
				//will refactor later
				if (error) {
					reject("create user failed");
				}
				resolve(user);
			});
		} catch (err) {
			reject("create user failed");
		}
	});
};

export const deleteUser = (user) => {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await getUsers();
			const filteredUsers = users.filter((savedUser) => {
				if (savedUser.id !== user.id) return true;
			});
			writeFile(filePath, JSON.stringify(filteredUsers), (error) => {
				//will refactor later
				if (error) {
					reject("delete user failed");
				}
				resolve(user);
			});
		} catch (err) {
			reject("delete user failed");
		}
	});
};

export const updateUser = (user) => {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await getUsers();
			const updatedUsers = users.map((savedUser) => {
				if (savedUser.id === user.id) {
					savedUser.email = user.email;
					return savedUser;
				}
				return savedUser;
			});
			writeFile(filePath, JSON.stringify(updatedUsers), (error) => {
				//will refactor later
				if (error) {
					reject("delete user failed");
				}
				resolve(user);
			});
		} catch (err) {
			resolve("update user failed");
		}
	});
};
