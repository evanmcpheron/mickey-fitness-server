import jwt from 'jsonwebtoken';

export const currentUser = (req, res, next) => {
	if (!req.session?.jwt) {
		return next();
	}

	try {
		const payload = jwt.verify(req.session.jwt, process.env.JSON_WEB_TOKEN);

		req.currentUser = payload;
	} catch (err) {
		console.log(err);
	}

	next();
};
