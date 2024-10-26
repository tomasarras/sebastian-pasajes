import { PasajesDev } from "../db/index.js"
import { Personal } from "../db/index.js";
import { replaceFields } from "../utils/functions.js";
export const getAll = async () => {
	const tickets = await PasajesDev.findAll({ include: [{ model: Personal, as: "pasajesDevPersonal" }] })
	return replaceFields({pasajesDevPersonal: "personal"}, tickets.map(t => t.get({ plain: true })))
};
