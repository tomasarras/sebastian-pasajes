import { ISORc } from "../db/index.js"

export const getAll = async () => {
	const rgs = await ISORc.findAll()
	return rgs
};
