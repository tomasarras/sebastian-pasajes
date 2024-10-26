import { IsoTr, Cliente, Personal } from "../../db/index.js"
import { replaceFields } from "../../utils/functions.js";

export const getAll = async () => {
	const times = await IsoTr.findAll({ include: [
		{model: Cliente, as: 'isoTrCliente'},
		{model: Personal, as: 'isoTrPersonal'},
	]})
	return replaceFields({isoTrCliente:'cliente', isoTrPersonal:'personal'}, times.map(t => t.get({ plain: true })))
};
