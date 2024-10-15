import { Sector } from "../db/index.js"
export const getAll = async () => {
	const sectors = await Sector.findAll()
	return sectors
};
