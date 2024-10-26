import { Formadores } from "../../db/index.js"
export const getAll = async () => {
	const formadores = await Formadores.findAll()
	return formadores.map(f => f.get({ plain: true }))
};
