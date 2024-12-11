import config from '../config.js';
import transporter from '../mail/nodemailer.js'

export const sendEmail = async (to, subject, html, text, attachFiles) => {
	if (attachFiles != undefined && !Array.isArray(attachFiles)) {
		attachFiles = [attachFiles]
	}
	try {
		if (Array.isArray(to)) {
			for (let to2 of to) {
				await sendEmail(to2, subject, html, text, attachFiles)
			}
			return;
		}

		// Preparamos los archivos adjuntos
		const attachments = attachFiles ? attachFiles.map(filePath => ({
			filename: filePath.split('/').pop(), // Obtiene el nombre del archivo de la ruta
			path: filePath // Ruta completa del archivo
		})) : [];

		return await transporter.sendMail({
			from: config.mail.from,
			to,
			subject,
			text,
			html,
			attachments
		})
	} catch (err) {
		console.error(`Could't not send email to ${to} error=${err}`);
	}
};