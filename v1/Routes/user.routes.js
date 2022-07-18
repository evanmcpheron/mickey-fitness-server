import express from 'express';
import { user } from '../Controllers/User/userIndex.controller';
import { currentUser } from '../Middlewares/current-user';
import { File } from '../Services/File';

module.exports = () => {
	const router = express.Router();

	// @route    GET /v1/auth
	// @desc     Route will return all user in database
	// @access   PUBLIC
	router.get('/', async (req, res) => await user.get.all(req, res));

	// @route    GET /v1/auth/me
	// @desc     Route will return all user in database
	// @access   PRIVATE
	router.get(
		'/me',
		currentUser,
		async (req, res) => await user.get.me(req, res)
	);

	// @route    POST /v1/auth/signup
	// @desc     Register user
	// @access   Public
	router.post('/sign-up', async (req, res) => await user.post.signup(req, res));

	// @route    POST v1/auth/login
	// @desc     Authenticate user & get token
	// @access   Public
	router.post('/sign-in', async (req, res) => await user.post.login(req, res));

	// @route    POST v1/auth/forgot-password
	// @desc     Sends a forgot password link to email
	// @access   Public
	router.post(
		'/forgot-password',
		async (req, res) => await user.post.forgotPassword(req, res)
	);

	// @route    POST v1/auth/password-reset/:userId/:token
	// @desc     Sends a forgot password link to email to reset password
	// @access   Public
	router.post(
		'/password-reset/:userId/:token',
		async (req, res) => await user.post.passwordReset(req, res)
	);

	// @route    POST v1/auth/profile/image
	// @desc     Sends a forgot password link to email to reset password
	// @access   Public
	router.put(
		'/profile/image',
		currentUser,
		File.type('image'),
		async (req, res) => await user.update.profileImageUpload(req, res)
	);

	// @route    POST v1/auth/signout
	// @desc     Removes current user session information form server
	// @access   Public
	router.post(
		'/sign-out',
		async (req, res) => await user.post.signout(req, res)
	);

	// TODO: MAKE SURE TO CANCEL ANY SUBSCRIPTIONS!
	// @route    DELETE v1/auth
	// @desc     Deletes a user
	// @access   Private
	router.delete('/', async (req, res) => await user.remove.user(req, res));

	return router;
};
