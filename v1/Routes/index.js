const express = require('express');

const { routing } = require('../../constants');

const userRoute = require('./user.routes');
const globalRoute = require('./global.routes');

module.exports = application => {
	const router = express.Router();

	router.use(routing.USER_ROOT, userRoute(application));
	router.use(routing.GLOBAL_ROOT, globalRoute(application));

	return router;
};
