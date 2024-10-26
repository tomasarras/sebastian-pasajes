import { IsoAudiProg, Sector } from "../../db/index.js"
import { Op } from 'sequelize';
import { filterAttributes } from "../../utils/functions.js";

export const getAll = async (where) => {
	const { from, to, chkVto } = where
	const whereConditionsToKeep = ["IdSector", "IdEstado"]
	where = filterAttributes(where, whereConditionsToKeep)
	if (from && to)
		where.FechaProg = { [Op.between]: [from, to] };
	if (chkVto === 'true') {
		const today = new Date().toISOString().split('T')[0];
		where[Op.and] = [
			{ FechaReal: '0000-00-00' },
			{ FechaProg: { [Op.lt]: today } }
		];
	}
	const ISOAuds = await IsoAudiProg.findAll({ where, include: [ { model: Sector, as: 'sector' } ] })
	return ISOAuds.map(a => a.get({ plain: true }))
};
