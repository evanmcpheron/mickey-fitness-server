import { User } from '../../Models/User';
import { error, success } from '../../Config/responseAPI';
import { File } from '../../Services/File';

module.exports = {
	profileImageUpload: async (req, res) => {
		if (!req.currentUser) return;

		const fileName = await File.uploadImage(req.file);

		if (
			fileName === 'Invalid file type' ||
			fileName === 'File must be less than 3mb'
		) {
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
