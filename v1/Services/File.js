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

	static validation(file, maxSize, types) {
		const s3 = new AWS.S3({
			accessKeyId: process.env.AWS_ID,
			secretAccessKey: process.env.AWS_SECRET,
		});
		if (file.size > maxSize) {
			return 'File must be less than 3mb'; // TODO: make file size message more dynamic
		}

		let myFile = file.originalname.split('.');

		const fileType = myFile[myFile.length - 1];

		if (!types.includes(fileType)) {
			return 'Invalid file type';
		}
		return;
	}

	static async upload(file) {
		try {
			let myFile = file.originalname.split('.');
			const fileType = myFile[myFile.length - 1];

			const random = v4();

			const params = {
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: `${random}.${fileType}`,
				Body: file.buffer,
			};

			s3.upload(params, (error, data) => {
				console.log(
					'🚀 ~ file: File.js ~ line 61 ~ File ~ s3.upload ~ data',
					data
				);
				if (error) {
					console.error(
						'🚀 ~ file: File.js ~ line 56 ~ File ~ s3.upload ~ error',
						error
					);
					return 'Something went wrong with upload';
				}
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
		const s3 = new AWS.S3({
			accessKeyId: process.env.AWS_ID,
			secretAccessKey: process.env.AWS_SECRET,
		});

		const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: file };

		s3.deleteObject(params, function (error, data) {
			if (error) {
				console.error('🚀 ~ file: File.js ~ line 87 ~ File ~ error', error);
				return error;
			}
		});
		return 'File successfully deleted';
	}
}
