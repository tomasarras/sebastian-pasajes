import { IsoIndicadores } from "../../db/index.js"
export const getAll = async () => {
	const indicadores = await IsoIndicadores.findAll()
	return indicadores.map(i => i.get({ plain: true }))
};
