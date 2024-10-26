import { Proveedor } from "../db/index.js"
import { EMPTY_PROVIDER } from "../utils/constants.js";
import { Op } from 'sequelize';

export const getAll = async (where) => {
	const { search, active } = where
	delete where.search
	delete where.active
    const skipIds = [EMPTY_PROVIDER]
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
	const providers = await Proveedor.findAll({ where })
	return providers.map(p => p.get({plain:true}))
};
