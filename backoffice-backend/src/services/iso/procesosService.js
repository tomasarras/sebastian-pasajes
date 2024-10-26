import { Op } from "sequelize";
import { IsoProcesos } from "../../db/index.js"

export const getAll = async () => {
	const procesos = await IsoProcesos.findAll({ where: { Id: {[Op.ne]: 0 }} })
	return procesos.map(p => p.get({ plain: true }))
};