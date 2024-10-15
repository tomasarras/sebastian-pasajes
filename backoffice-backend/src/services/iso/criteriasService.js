import { ISOCriterio } from "../db/index.js"

export const getAll = async () => {
	const criterias = await ISOCriterio.findAll()
	return criterias
};
