import { User } from '../../Models/User.model';
import { error, success } from '../../Utils/responseAPI.util';
import { File } from '../../Services/File.service';

module.exports = {
	profileImageUpload: async (req, res) => {
		if (!req.currentUser) return;

		const acceptedTypes = ['png', 'jpg', 'jpeg'];

		const threeMB = 1000 * 1000 * 3;

		const validationResult = File.validation(req.file, threeMB, acceptedTypes);

		if (
			validationResult === 'Invalid file type' ||
			validationResult === 'File must be less than 3mb'
		) {
			return res.status(400).send(error, validationResult);
		}

		const fileName = await File.upload(req.file);

		if (fileName === 'Something went wrong with upload') {
			return res.status(400).send(error(fileName, res.statusCode));
		}

		const user = await User.findOne({ id: req.currentUser.id });

		user.data.photoURL = fileName;
		await user.save();

		// TODO: IMPLEMENT DELETE FILE MEATHOD

		res
			.status(200)
			.send(
				success('Profile photo successfully updated.', res.statusCode, user)
			);
	},
};
