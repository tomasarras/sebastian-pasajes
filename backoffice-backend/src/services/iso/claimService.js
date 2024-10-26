import { IsoReclamosc, IsoReclamost, Cliente, Personal, Proveedor } from "../../db/index.js"
import { replaceFields } from "../../utils/functions.js";

export const getAllC = async () => {
	const claims = await IsoReclamosc.findAll({ include: [ 
		{ model: Cliente, as: 'isoReclamoscCliente' },
		{ model: Personal, as: 'isoReclamoscPersonal' },
		{ model: Proveedor, as: 'isoReclamoscProveedor' },
	]})
	return replaceFields({isoReclamoscCliente: 'cliente', isoReclamoscPersonal:'personal', isoReclamoscProveedor:'proveedor'}, claims.map(c => c.get({ plain: true })))
};

export const getAllT = async () => {
	const claims = await IsoReclamost.findAll({ include: [ 
		{ model: Personal, as: 'isoReclamostPersonal' },
		{ model: Proveedor, as: 'isoReclamostProveedor' },
	]})
	return replaceFields({isoReclamostPersonal: 'personal', isoReclamostProveedor:'proveedor'}, claims.map(c => c.get({ plain: true })))
};