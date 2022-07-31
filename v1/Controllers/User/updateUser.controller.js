import { User } from '../../Models/User.model';
import { error, success } from '../../Utils/responseAPI.util';
import { File } from '../../Services/File.service';

module.exports = {
	user: async (req, res) => {
		const user = await User.findById(req.currentUser.id);
		console.log("🚀 ~ file: updateUser.controller.js ~ line 8 ~ user: ",user);
		res.status(200).send(success('Successfully updated user', res.statusCode, user))
	},
	profileImageUpload: async (req, res) => {
		console.log("🚀 ~ file: updateUser.controller.js ~ line 7 ~ req.currentUser: ",req.currentUser);
		if (!req.currentUser) {
			return res.status(403).send(error('You must be logged in to upload a profile photo', res.statusCode, {}))
		};

		const currentUserIdString = req.currentUser._id.toString();
		const prevProfilePhoto = req.currentUser.data.photoURL;

		const acceptedTypes = ['png', 'jpg', 'jpeg'];

		const threeMB = 1000 * 1000 * 3;
		console.log(req.file)
		const validationResult = File.validation(req.file, threeMB, acceptedTypes);

		if (
			validationResult === 'Invalid file type' ||
			validationResult === 'File must be less than 3mb'
		) {
			return res.status(400).send(error(validationResult,res.statusCode,{}));
		}

		const fileName = await File.upload(req.file, `user/${currentUserIdString}`);

		if (fileName === 'Something went wrong with upload') {
			return res.status(400).send(error(fileName, res.statusCode));
		}

		const user = await User.findOne({ _id: req.currentUser.id });

		user.data.photoURL = fileName;
		await user.save();

		if(prevProfilePhoto !== 'default-profile.jpg') {

			await File.delete(prevProfilePhoto,`user/${currentUserIdString}`);
		}
		console.log("🚀 ~ file: updateUser.controller.js ~ line 34 ~ user: ", user);

		res
			.status(200)
			.send(
				success('Profile photo successfully updated.', res.statusCode, { uuid: user._id, fileName: user.data.photoURL, user })
			);
	},
};
