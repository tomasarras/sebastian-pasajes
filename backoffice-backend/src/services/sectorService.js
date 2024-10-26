import { Sector } from "../db/index.js"
import { Op } from 'sequelize';

export const getAll = async () => {
	const sectors = await Sector.findAll({ where: { Id: { [Op.ne]: 0 } } })
	return sectors.map(s => s.get({ plain: true }))
};
