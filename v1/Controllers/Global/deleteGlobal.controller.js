import { error, success } from '../../Utils/responseAPI.util';
import { File } from '../../Services/File.service';

module.exports = {
	deleteFile: async (req, res) => {
		const { fileName } = req.body;

		const response = await File.delete(fileName);

		if (response === 'File successfully deleted') {
			return res
				.status(200)
				.send(success('success and stuff', res.statusCode, response));
		}
		return res
			.status(400)
			.send(error('Something went wrong', res.statusCode, {}));
	},
};
