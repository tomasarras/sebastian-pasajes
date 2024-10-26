import { Op } from "sequelize";
import { IsoCriterios } from "../../db/index.js"

export const getAll = async () => {
	const criterias = await IsoCriterios.findAll({ where: { Id: {[Op.ne]: 0 }} })
	return criterias.map(c => c.get({ plain: true }))
};
