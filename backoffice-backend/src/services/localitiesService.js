import { Locality } from "../db/index.js"
export const getAll = async () => {
	const localities = await Locality.findAll()
	return localities
};
