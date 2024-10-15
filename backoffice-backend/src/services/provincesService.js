import { Province } from "../db/index.js"
export const getAll = async () => {
	const provinces = await Province.findAll()
	return provinces
};
