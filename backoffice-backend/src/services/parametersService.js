import { Parametros, Localidad } from "../db/index.js"
import { replaceFields } from "../utils/functions.js";
import * as emailService from './emailService.js';

export const getParameters = async () => {
	const parameters = await Parametros.findAll({ include: [
		{ model: Localidad, as: 'parametrosLocalidad', },]})
	return replaceFields({parametrosLocalidad:'localidad',}, parameters.map(p => p.get({ plain: true })))[0]
};

export const sendTestsEmails = async () => {
	const parameters = await Parametros.findOne({ where: { Id:1 }, attributes: ["EMail", "EMail2"]})
	try {
		const email1 = parameters.EMail
		const email2 = parameters.EMail2
		const response = await emailService.sendEmail(email1, 'Email administrador (sistema ordenes pagos)', 'prueba de envio de correo para email administrador', 'prueba de envio de correo para email administrador');
		const response2 = await emailService.sendEmail(email2, 'Email licencias (sistema ordenes pagos)', 'prueba de envio de correo para email licencias', 'prueba de envio de correo para email licencias');
		console.log("test email send to ", email1);
		console.log("test email send to ", email2);
		console.log(response);
		console.log(response2);
	} catch (e) {
		console.error("could not send email");
		console.error(e);
	}
};

export const update = async (newParams) => {
	return Parametros.update(newParams, {where: {id:1}})
};
