import jwt from 'jsonwebtoken';
import { User } from '../Models/User';

export const currentUser = async (req, res, next) => {
	if (!req.session?.access_token) {
		return next();
	}

	try {
		const payload = jwt.verify(
			req.session.access_token,
			process.env.JSON_WEB_TOKEN
		);

		const response = await User.findById(payload.id);

		req.currentUser = response;
	} catch (err) {
		console.log(err);
	}

	next();
};
