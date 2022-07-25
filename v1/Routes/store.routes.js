import express from 'express';
import { storeRoute } from '../Controllers/Store/storeIndex.controller';
import { currentUser } from '../Middlewares/current-user';

module.exports = () => {
	const router = express.Router();

	// @route    GET /v1/store/me
	// @desc     gets my store
	// @access   Public
	router.get(
		'/me', currentUser,
		async (req, res) => await storeRoute.get.me(req, res)
	);

	return router;
};
