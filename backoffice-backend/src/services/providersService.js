import { Proveedor } from "../db/index.js"
import { EMPTY_PROVIDER } from "../utils/constants.js";
import { Op, fn } from 'sequelize';

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
    if (where.Nombre) {
        where.Nombre = {
            [Op.like]: fn('LOWER', `%${where.Nombre.toLowerCase()}%`)
        };
    }
	const providers = await Proveedor.findAll({ where })
	return providers.map(p => p.get({plain:true}))
};

export const create = async (providerData) => {
    // Establecemos la fecha de alta
    providerData.FechaAlta = new Date().toISOString().split('T')[0];
    // Obtenemos el siguiente ID
    const maxId = await Proveedor.max('Id');
    providerData.Id = maxId + 1;
    
    // Convertimos nombre y apellido a mayúsculas
    providerData.Nombre = providerData.Nombre.toUpperCase();
    if (providerData.Apellido) {
        providerData.Apellido = providerData.Apellido.toUpperCase();
    }
    
    const newProvider = await Proveedor.create(providerData);
    return newProvider.get({ plain: true });
};

export const update = async (providerId, providerData) => {
    const provider = await Proveedor.findByPk(providerId);
    if (!provider) {
        throw new Error('Proveedor no encontrado');
    }

    // Convertimos nombre y apellido a mayúsculas si se proporcionan
    if (providerData.Nombre) {
        providerData.Nombre = providerData.Nombre.toUpperCase();
    }
    if (providerData.Apellido) {
        providerData.Apellido = providerData.Apellido.toUpperCase();
    }

    await Proveedor.update(providerData, { where: { Id: providerId }});
    
    const updatedProvider = await Proveedor.findByPk(providerId);
    return updatedProvider.get({ plain: true });
};

export const deleteById = async (providerId) => {
    const provider = await Proveedor.findByPk(providerId);
    if (!provider) {
        throw new Error('Proveedor no encontrado');
    }

    // Soft delete: actualizamos la fecha de baja
    const fechaBaja = new Date().toISOString().split('T')[0];
    await Proveedor.update(
        { FechaBaja: fechaBaja },
        { where: { Id: providerId }}
    );

    const deletedProvider = await Proveedor.findByPk(providerId);
    return deletedProvider.get({ plain: true });
};
