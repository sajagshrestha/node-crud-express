import * as fakeDB from "../utils/fakeDbUtils.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const loginUser = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await fakeDB.getUserBYEmail(email);
		if (!user) return res.status(404).send("email not found");

		//if user found check for password
		const passwordMatches = await bcrypt.compare(
			password,
			user.hashedPassword
		);
		if (!passwordMatches) return res.status(404).send("incorrect password");
		res.send(`${user.email} has been logged in`);
	} catch (err) {
		next(err);
	}
};

export const registerUser = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await fakeDB.getUserBYEmail(email);
		if (user) return res.send("user already exists");

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await fakeDB.saveUser({
			id: uuid(),
			email,
			hashedPassword,
		});

		res.send(`${newUser.email}'s account has been created`);
	} catch (err) {
		next(err);
	}
};
