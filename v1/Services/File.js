import AWS from 'aws-sdk';
import multer from 'multer';
import sharp from 'sharp';
import { v4 } from 'uuid';

export class File {
	static storage = multer.memoryStorage({
		destination: function (req, file, callback) {
			callback(null, '');
		},
	});

	static type(fileType) {
		return multer({ storage: this.storage }).single(fileType);
	}
	static async uploadImage(file) {
		try {
			const s3 = new AWS.S3({
				accessKeyId: process.env.AWS_ID,
				secretAccessKey: process.env.AWS_SECRET,
			});

			const allowed_files = ['png', 'jpeg', 'jpg'];
			const allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg'];

			let myFile = file.originalname.split('.');
			const fileType = myFile[myFile.length - 1];

			if (
				!allowed_files.includes(fileType) ||
				!allowed_file_types.includes(file.mimetype)
			) {
				return 'Invalid file type';
			}
			const fileSize = 1000 * 1000 * 3; //3mb

			if (file.size > fileSize) {
				return 'File must be less than 3mb';
			}

			const random = v4();

			const params = {
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: `${random}.${fileType}`,
				Body: sharp(file.buffer),
			};

			s3.upload(params, (error, data) => {
				console.log(
					'🚀 ~ file: File.js ~ line 61 ~ File ~ s3.upload ~ data',
					data
				);
				if (error) {
					console.error(error);
				}
				console.log(data);
			});
			return `${random}.${fileType}`;
		} catch (error) {
			console.log(
				'🚀 ~ file: File.js ~ line 45 ~ File ~ upload ~ error',
				error
			);
			return error;
		}
	}

	static async delete(file) {
		console.log('🚀 ~ file: File.js ~ line 50 ~ File ~ delete ~ file', file);
	}
}
