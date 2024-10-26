import config from '../config.js';
import transporter from '../mail/nodemailer.js'

export const sendEmail = async (to, subject, html, text) => {
	try {
		return await transporter.sendMail({
			from: config.mail.from,
			to,
			subject,
			text,
			html,
		})
	} catch (err) {
		console.err(`Could't not send email to ${to} error=${err}`);
	}
};