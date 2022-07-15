import jwt from 'jsonwebtoken';
import { success, error } from '../../Config/responseAPI';
import { Password } from '../../Services/password';

import { User } from '../../Models/User';

module.exports = {
	signup: async (req, res) => {
		const { email, password, displayName } = req.body;

		const existingUser = await User.findOne({ 'data.email': email });

		if (existingUser) {
			return res
				.status(401)
				.send(
					error(
						'A user already exists with that email. Please try again.',
						res.statusCode
					)
				);
		}

		const user = new User({
			password,
			role: 'user',
			data: { displayName, email },
		});

		await user.save();

		// Generate JWT
		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
				displayName: user.displayName,
			},
			process.env.JSON_WEB_TOKEN
		);

		// Store it on session object
		req.session = {
			access_token: userJwt,
		};

		res.status(201).send(
			success('You have succesfully registered', res.statusCode, {
				user,
			})
		);
	},
	login: async (req, res) => {
		const { email, password, rememberMe } = req.body;

		const existingUser = await User.findOne({ 'data.email': email });

		if (!existingUser) {
			return res
				.status(401)
				.send(
					error(
						'You have entered an incorrect email or password. Please try again',
						res.statusCode
					)
				);
		}

		const passwordsMatch = await Password.compare(
			existingUser.password,
			password
		);

		if (!passwordsMatch) {
			return res
				.status(401)
				.send(
					error(
						'You have entered an incorrect email or password. Please try again',
						res.statusCode
					)
				);
		}

		// Generate JWT
		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
				displayName: existingUser.displayName,
			},
			process.env.JSON_WEB_TOKEN,
			{ expiresIn: rememberMe ? '14d' : '24h' }
		);

		// Store it on session object
		req.session = {
			access_token: userJwt,
		};

		res.status(200).send(
			success('Welcome back', res.statusCode, {
				user: existingUser,
			})
		);
	},
	signout: (req, res) => {
		req.session = null;
		res
			.status(200)
			.send(success('You have successfully signed out', res.statusCode, {}));
	},
};
