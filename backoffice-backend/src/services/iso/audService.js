import { ISOAud } from "../db/index.js"
export const getAll = async () => {
	const ISOAuds = await ISOAud.findAll()
	return ISOAuds
};
