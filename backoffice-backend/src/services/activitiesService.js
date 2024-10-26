import { Actividad } from "../db/index.js"
import { Op } from 'sequelize';

export const getAll = async () => {
	const activities = await Actividad.findAll({ where: { Id: {[Op.ne]: 0} }})
	return activities.map(a => a.get({plain:true}))
};
