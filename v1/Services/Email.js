const nodemailer = require('nodemailer');

export class Email {
	static async send(to, subject, message, from, fromPassword) {
		try {
			const transporter = nodemailer.createTransport({
				host: process.env.HOST,
				port: process.env.NODE_ENV === 'production' ? 465 : 587,
				secure: process.env.NODE_ENV === 'production',
				auth: {
					user: from,
					pass: fromPassword,
				},
			});

			await transporter.sendMail({
				from,
				to,
				subject: subject,
				text: message,
			});

			return 'Email sent successfully.';
		} catch (error) {
			console.log("🚀 ~ file: Email.js ~ line 27 ~ error: ",error);
			return { error, message: 'email not sent' };
		}
	}
}
