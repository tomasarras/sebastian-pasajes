import { Op } from "sequelize";
import { Localidad } from "../db/index.js"
export const getAll = async () => {
	const localities = await Localidad.findAll({ where: { Id: {[Op.ne]: 0} }})
	return localities.map(p => p.get({ plain: true }))
};
