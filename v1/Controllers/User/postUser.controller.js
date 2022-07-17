import jwt from 'jsonwebtoken';
import { success, error } from '../../Config/responseAPI';
import { Password } from '../../Services/password';
import { sendEmail } from '../../Utils/sendEmail';
import crypto from 'crypto';

import { User } from '../../Models/User';
import Token from '../../Models/Token';

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
	forgotPassword: async (req, res) => {
		const { email } = req.body;

		const user = await User.findOne({ 'data.email': email });

		if (!user) {
			return res
				.status(401)
				.send(
					error('Check your email for password reset link', res.statusCode)
				);
		}

		let token = await Token.findOne({ userId: user._id });

		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString('hex'),
			}).save();
		}

		const baseUrl =
			process.env.NODE_ENV === 'production'
				? process.env.PROD_BASE_UI_URL
				: process.env.LOCAL_BASE_UI_URL;

		const link = `${baseUrl}/password-reset/${user._id}/${token.token}`;

		await sendEmail(user.email, 'Password reset', link);

		const response = await sendEmail(
			email,
			'Password Reset Link for Mickey Fitness',
			link
		);

		res
			.status(200)
			.send(
				success(
					'Check your email for password reset link',
					res.statusCode,
					response
				)
			);
	},
	passwordReset: async (req, res) => {
		const {
			password: { password },
		} = req.body;

		const hashedPassword = await Password.toHash(password);

		try {
			const user = await User.findOne({ _id: req.params.userId });
			if (!user) return res.status(400).send('invalid link or expired');

			const token = await Token.findOne({
				userId: user._id,
				token: req.params.token,
			});

			if (!token)
				return res
					.status(400)
					.send(error('Invalid link or expired', res.statusCode));

			user.password = password;

			await user.save();
			await token.deleteOne();

			res.send('password reset sucessfully.');
		} catch (error) {
			res.send('An error occured');
			console.log(error);
		}
	},
	signout: (req, res) => {
		req.session = null;
		res
			.status(200)
			.send(success('You have successfully signed out', res.statusCode, {}));
	},
};
