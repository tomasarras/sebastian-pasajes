import { Localidad, Provincia } from "../db/index.js"
import { Op } from 'sequelize';

export const getAll = async () => {
	const provinces = await Provincia.findAll({ where: { Id: { [Op.ne]: 0 }}, include: [{model:Localidad, as: "localidades"}]})
	return provinces.map(p => p.get({plain: true}))
};
