import { ISOTr } from "../db/index.js"

export const getAll = async () => {
	const times = await ISOTr.findAll()
	return times
};
