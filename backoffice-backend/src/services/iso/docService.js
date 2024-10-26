import { Op } from "sequelize";
import { IsoDocTipo } from "../../db/index.js"
export const getAll = async () => {
	const docs = await IsoDocTipo.findAll({ where: { Id: {[Op.ne]: 0 }} })
	return docs.map(d => d.get({ plain: true }))
};
