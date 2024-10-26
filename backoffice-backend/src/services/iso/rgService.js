import { IsoRg, Personal } from "../../db/index.js"
import { replaceFields } from "../../utils/functions.js";

export const getAll = async () => {
	const rgs = await IsoRg.findAll({ include: [{ model: Personal, as: 'isoRgPersonal'}] })
	return replaceFields({isoRgPersonal:'personal'}, rgs.map(r => r.get({ plain: true })))
};
