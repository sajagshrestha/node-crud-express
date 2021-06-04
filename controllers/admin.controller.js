import * as fakeDB from "../utils/fakeDbUtils.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const allUsers = await fakeDB.getUsers();
		res.json(allUsers);
	} catch (err) {
		next(err);
	}
};

export const getSpecificUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await fakeDB.getUserByID(id);
		if (!user) return res.status(404).send("user not found");
		res.json(user);
	} catch (err) {
		next(err);
	}
};

export const updateUserEmail = async (req, res, next) => {
	const { id } = req.params;
	const { newEmail } = req.body;
	try {
		const user = await fakeDB.getUserByID(id);
		if (!user) return res.status(404).send("user not found");
		user.email = newEmail;
		const updatedUser = await fakeDB.updateUser(user);
		res.send(`${updatedUser.email} is your new email`);
	} catch (err) {
		next(err);
	}
};

export const deleteSpecificUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await fakeDB.getUserByID(id);
		if (!user) return res.status(404).send("user not found");
		const deletedUser = await fakeDB.deleteUser(user);
		res.send(`${deletedUser.email} has been deleted`);
	} catch (err) {
		next(err);
	}
};
