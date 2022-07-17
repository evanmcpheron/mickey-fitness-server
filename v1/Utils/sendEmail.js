const nodemailer = require('nodemailer');

export const sendEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			port: process.env.NODE_ENV === 'production' ? 465 : 587,
			secure: process.env.NODE_ENV === 'production',
			auth: {
				user: process.env.EMAIL_NOREPLY_EMAIL,
				pass: process.env.EMAIL_NOREPLY_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.EMAIL_NOREPLY_EMAIL,
			to: email,
			subject: subject,
			text: text,
		});

		return 'email sent sucessfully';
	} catch (error) {
		return { error, message: 'email not sent' };
	}
};
