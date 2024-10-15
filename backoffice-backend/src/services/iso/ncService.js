import { ISONC } from "../db/index.js"
export const getAll = async () => {
	const ISONCs = await ISONC.findAll()
	return ISONCs
};
