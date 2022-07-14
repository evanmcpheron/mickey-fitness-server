import { error, success } from '../../Config/responseAPI';

export default {
	me: async (req, res) => {
		if (!req.currentUser) {
			return res.status(401).send(
				error('', res.statusCode, {
					role: '',
					uuid: '',
					data: {
						displayName: 'Guest',
						photoURL: 'assets/images/avatars/brian-hughes.jpg',
						email: '',
					},
				})
			);
		}
		res.status(200).send(success('', res.statusCode, req.currentUser));
	},
};
