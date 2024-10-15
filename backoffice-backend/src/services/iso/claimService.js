import { ISOReclamosC, ISOReclamosT } from "../db/index.js"

export const getAllC = async () => {
	const claims = await ISOReclamosC.findAll()
	return claims
};

export const getAllT = async () => {
	const claims = await ISOReclamosT.findAll()
	return claims
};