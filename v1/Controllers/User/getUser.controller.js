import { success } from '../../Config/responseAPI';

export default {
	me: async (req, res) => {
		res.status(200).send(success('', res.statusCode, req.currentUser || null));
	},
};
