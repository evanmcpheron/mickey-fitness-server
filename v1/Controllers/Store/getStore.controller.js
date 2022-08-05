import { error, success } from '../../Utils/responseAPI.util';
import { Store } from '../../Models/Store.model';
import { User } from '../../Models/User.model';

module.exports = {
	store: async (req, res) => {
		const {userId} = req.params
		if (!req.currentUser) {
			return res.status(403).send(error('You must be logged in for this to work.', res.statusCode, {}));
		}

		const user = req.params.userId === 'me' ? req.currentUser : await User.findById(userId);

		const store = await Store.findOne({ userId: user._id });

		if (!store) {
			return res.status(200).send(success('There is no store to be found.', res.statusCode, {}));
		}
		res.status(200).send(success('Your store was found.', req.statusCode, store));
	},
};
