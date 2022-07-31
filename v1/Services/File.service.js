import AWS from 'aws-sdk';
import multer from 'multer';
import { v4 } from 'uuid';

export class File {
	static s3 = new AWS.S3({
		accessKeyId: process.env.AWS_ID,
		secretAccessKey: process.env.AWS_SECRET,
	});

	static storage = multer.memoryStorage({
		destination: function (req, file, callback) {
			callback(null, '');
		},
	});

	static type(fileType) {
		return multer({ storage: this.storage }).single(fileType);
	}

	static validation(file, maxSize, types) {
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

	static async upload(file, location) {
		try {
			let myFile = file.originalname.split('.');
			const fileType = myFile[myFile.length - 1];

			const random = v4();

			const params = {
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: `${location}/${random}.${fileType}`,
				Body: file.buffer,
			};

			await this.s3.upload(params, (error, data) => {

				if (error) {
					console.error(
						'🚀 ~ file: File.service.js ~ line 56 ~ File ~ s3.upload ~ error',
						error
					);
					return 'Something went wrong with upload';
				}
			});
			return `${random}.${fileType}`;
		} catch (error) {
			console.log(
				'🚀 ~ file: File.service.js ~ line 65 ~ File ~ upload ~ error',
				error
			);
			return error;
		}
	}

	static async delete(file,location) {
		const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: `${location}/${file}` };

		this.s3.deleteObject(params, function (error, data) {
			if (error) {
				console.error('🚀 ~ file: File.service.js ~ line 87 ~ File ~ error', error);
				return error;
			}
		});
		return 'File successfully deleted';
	}
}
