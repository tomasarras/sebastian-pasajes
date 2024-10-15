import { ISODoc } from "../db/index.js"
export const getAll = async () => {
	const docs = await ISODoc.findAll()
	return docs
};
