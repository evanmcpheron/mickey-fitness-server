import express from 'express';
import { globalRoute } from '../Controllers/Global/globalIndex.controller';

module.exports = () => {
	const router = express.Router();

	// @route    DELETE /v1/global/file
	// @desc     Route will delete specific file in database
	// @access   PRIVATE
	router.delete(
		'/file',
		async (req, res) => await globalRoute.remove.deleteFile(req, res)
	);

	return router;
};
