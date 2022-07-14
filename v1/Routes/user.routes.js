import express from 'express';
import { user } from '../Controllers/User/userIndex.controller';
import { currentUser } from '../Middlewares/current-user';

module.exports = () => {
	const router = express.Router();

	// @route    GET /v1/user
	// @desc     Route will return all user in database
	// @access   PUBLIC
	router.get('/', async (req, res) => await user.get.all(req, res));

	// @route    GET /v1/user/me
	// @desc     Route will return all user in database
	// @access   PRIVATE
	router.get(
		'/me',
		currentUser,
		async (req, res) => await user.get.me(req, res)
	);

	// @route    POST /v1/user/signup
	// @desc     Register user
	// @access   Public
	router.post('/sign-up', async (req, res) => await user.post.signup(req, res));

	// @route    POST v1/user/login
	// @desc     Authenticate user & get token
	// @access   Public
	router.post('/sign-in', async (req, res) => await user.post.login(req, res));

	// @route    POST v1/user/signout
	// @desc     Removes current user session information form server
	// @access   Public
	router.post(
		'/sign-out',
		async (req, res) => await user.post.signout(req, res)
	);

	// TODO: MAKE SURE TO CANCEL ANY SUBSCRIPTIONS!
	// @route    DELETE v1/user
	// @desc     Deletes a user
	// @access   Private
	router.delete('/', async (req, res) => await user.remove.user(req, res));

	return router;
};
