const nodemailer = require('nodemailer');

export class Email {
	static async send(to, subject, text, from, fromPassword) {
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
				from: process.env.EMAIL_NOREPLY_EMAIL,
				to,
				subject: subject,
				text: text,
			});

			return 'email sent sucessfully';
		} catch (error) {
			return { error, message: 'email not sent' };
		}
	}
}
