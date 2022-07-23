import { error, success } from '../../Config/responseAPI';
import { Email } from '../../Services/Email';

module.exports = {
	sendEmail: async (req, res) => {
		const { name, from, subject, message } = req.body;

		const response = await Email.send(
			process.env.EMAIL_SUPPORT_EMAIL,
			subject,
			`From: ${name}
Email: ${from}
Subject: ${subject}
Message: ${message}`,
			process.env.EMAIL_SUPPORT_EMAIL,
			process.env.EMAIL_SUPPORT_PASSWORD);

		if (response === 'Email sent successfully.') {
			return res
				.status(200)
				.send(success('success and stuff', res.statusCode, response));
		}

		return res
			.status(400)
			.send(error('Something went wrong', res.statusCode, {}));
	},};
