import { ISOIndicadores } from "../db/index.js"
export const getAll = async () => {
	const indicadores = await ISOIndicadores.findAll()
	return indicadores
};
