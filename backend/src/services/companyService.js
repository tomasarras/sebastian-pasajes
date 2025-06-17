import { Company } from "../db/index.js";
import { COMPANY_ID } from "../utils/constants.js";
import * as emailService from "./emailService.js";

export const update = async (companyParams) => {
    await Company.update(companyParams, { where: { id: COMPANY_ID } })
    const updatedCompany = await Company.findByPk(COMPANY_ID)
    return updatedCompany.get({ plain: true })
};

export const sendTestsEmails = async () => {
	const parameters = await get()
	try {
		const email = parameters.emailNotification
		const response = await emailService.sendEmail(email, 'Email de prueba (sistema ordenes pasajes)', 'prueba de envio de correo para email', 'prueba de envio de correo para email');
		console.log("test email send to ", email);
		console.log(response);
	} catch (e) {
		console.error("could not send email");
		console.error(e);
	}
};

export const get = async () => {
    const [company] = await Company.findAll()
    return company.get({ plain: true })
};