const express = require('express');

const { routing } = require('../../constants');

const userRoute = require('./user.routes');
const globalRoute = require('./global.routes');
const storeRoute = require('./store.routes');
const productRoute = require('./product.routes');

module.exports = application => {
	const router = express.Router();

	router.use(routing.USER_ROOT, userRoute(application));
	router.use(routing.GLOBAL_ROOT, globalRoute(application));
	router.use(routing.STORE_ROOT, storeRoute(application));
	router.use(routing.PRODUCT_ROOT, productRoute(application));

	return router;
};
