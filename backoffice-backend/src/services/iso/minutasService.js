import { IsoMinutas } from "../../db/index.js"
export const getAll = async () => {
	const minutas = await IsoMinutas.findAll()
	return minutas.map(m => m.get({ plain: true }))
};
