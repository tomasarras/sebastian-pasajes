import { Parameters } from "../db/index.js"

export const getAll = async () => {
	const parameters = await Parameters.findAll()
	return parameters
};
