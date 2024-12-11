import { Parametros, Localidad } from "../db/index.js"
import { replaceFields } from "../utils/functions.js";

export const getParameters = async () => {
	const parameters = await Parametros.findAll({ include: [
		{ model: Localidad, as: 'parametrosLocalidad', },]})
	return replaceFields({parametrosLocalidad:'localidad',}, parameters.map(p => p.get({ plain: true })))[0]
};

export const update = async (newParams) => {
	return Parametros.update(newParams, {where: {id:1}})
};
