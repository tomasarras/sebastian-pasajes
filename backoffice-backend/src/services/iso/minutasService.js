import { ISOMinutas } from "../db/index.js"
export const getAll = async () => {
	const minutas = await ISOMinutas.findAll()
	return minutas
};
