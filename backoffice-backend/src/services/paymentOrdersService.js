import { Opago, OpagoEstado, Proveedor, Personal, Usuarios } from "../db/index.js"
import { filterAttributes, today, useLikeOperation } from "../utils/functions.js";
import { Op } from 'sequelize';

export const getAll = async (where) => {
	if (where == undefined || Object.keys(where).length == 0)
		where = { from: today() }
	const { from, to } = where
	const whereConditionsToKeep = ["Id", "IdProveedor", "IdEstado", "NFA", "NFO", "IdUsuario"]
	where = filterAttributes(where, whereConditionsToKeep)
	where = useLikeOperation(where)
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
	const paymentOrders = await Opago.findAll({ where, include:[
		{ model: OpagoEstado, as: 'estado', },
		{ model: Proveedor, as: 'operador' },
		{ model: Personal, as: 'personal' },
		{ model: Usuarios, as: 'usuario', include: [
			{ model: Personal, as: 'personal' }	]
		}
	] })
	return paymentOrders.map(po => po.get({plain:true}))
};