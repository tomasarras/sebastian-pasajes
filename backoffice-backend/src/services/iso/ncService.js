import { IsoNc, IsoNcTipo, IsoNcOrigen, IsoNcEstado, Personal, sequelize } from "../../db/index.js"
import { Op } from 'sequelize';
import { filterAttributes } from "../../utils/functions.js";

export const getAllOrigen = async () => {
	const origins = await IsoNcOrigen.findAll({ where: { Id: {[Op.ne]: 0} }})
	return origins.map(o => o.get({plain: true}))
}

export const getAll = async (where) => {
	const { from, to, vtoCumpl } = where
	const whereConditionsToKeep = ["IdRDet", "IdEstado", "IdEstado"]
	where = filterAttributes(where, whereConditionsToKeep)
	if (from && to) {
		where.Fecha = {
		  [Op.between]: [from, to]
		};
	} else if (from) {
		where.Fecha = {
		  [Op.gte]: from
		};
	} else if (to) {
		where.Fecha = {
		  [Op.lte]: to
		};
	}
	if (vtoCumpl) {
		const today = new Date().toISOString().split('T')[0];
		where[Op.and] = {
			IdEstado: { [Op.eq]: 1 },
			[Op.and]: sequelize.literal(`DATEDIFF(FechaA, '${today}') < 0`)
		}
	}
	const ISONCs = await IsoNc.findAll({ where, include: [
		{ model: IsoNcTipo, as: 'tipo' },
		{ model: IsoNcOrigen, as: 'origen' },
		{ model: IsoNcEstado, as: 'estado' },
		{ model: Personal, as: 'emisor' },
		{ model: Personal, as: 'det' },
		{ model: Personal, as: 'causa' },
		{ model: Personal, as: 'accion' },
		{ model: Personal, as: 'va' },
		{ model: Personal, as: 'vef' }
	]})
	return ISONCs.map(i => i.get({ plain: true }))
};
