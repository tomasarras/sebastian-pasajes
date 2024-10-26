import { Cliente, Localidad, Actividad, CondicionIva } from "../db/index.js"
import { EMPTY_CLIENT } from "../utils/constants.js";
import { filterAttributes, useLikeOperation } from "../utils/functions.js";
import { Op } from 'sequelize';

const deleteEmptyEntities = clients => clients.map(c => c.get({ plain: true })).map(c => {
	if (c.actividad?.Id == 0)
		delete c.actividad
	if (c.localidad?.Id == 0)
		delete c.localidad
	if (c.condicionIva?.Id == 0)
		delete c.condicionIva
	return c
})

export const getAll = async (where) => {
	const { search, active } = where
    const skipIds = [EMPTY_CLIENT]
	const whereConditionsToKeep = ["Identificacion", "IdActividad", "IdIva"]
	where = filterAttributes(where, whereConditionsToKeep)
	where = useLikeOperation(where)
	if (active !== undefined) {
		where.FechaBaja = { [active === "true" ? Op.ne : Op.eq]: "0000-00-00" }
	}
    if (search) {
        where[Op.or] = [
                { Nombre: { [Op.like]: `%${search}%` } },
                { Apellido: { [Op.like]: `%${search}%` } },
            ]
    }
    where.Id = { [Op.notIn]: skipIds };
	const clients = await Cliente.findAll({ where, include:[
		{ model: Localidad, as: 'localidad', },
		{ model: Actividad, as: 'actividad' },
		{ model: CondicionIva, as: 'condicionIva' }
	  ] })
	return deleteEmptyEntities(clients)
};

export const update = async (clientId, clientParam) => {
    await Cliente.update(clientParam, { where: { id: clientId }})
    const updatedClient = await Cliente.findByPk(clientId)
    return updatedClient.get({ plain: true })
};