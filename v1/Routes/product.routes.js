import express from 'express';
import { productRoute } from '../Controllers/Product/productIndex.controller';

module.exports = () => {
	const router = express.Router();

	// @route    GET /v1/product/
	// @desc     TODO:
	// @access   Public
	router.get(
		'/',
		async (req, res) => await productRoute.get
	);

	return router;
};
