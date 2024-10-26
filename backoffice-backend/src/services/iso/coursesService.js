import { Op } from "sequelize";
import { Curso, CursoTemas, Sector } from "../../db/index.js"
import { filterAttributes } from "../../utils/functions.js";

export const getAll = async (where) => {
	const { chkActivo } = where 
	const whereConditionsToKeep = ["Sector", "IdTema"]
	where = filterAttributes(where, whereConditionsToKeep)
	where.Id = {[Op.ne]:0}
	if (chkActivo === 'true') {
		const today = new Date().toISOString().split('T')[0];
		where[Op.or] = [
			{ FechaBaja: '0000-00-00' },//TODO: Si miras logs aca es Invalid date
			{ FechaBaja: { [Op.gt]: today } }
		]
	}
	const courses = await Curso.findAll({ where, 
		include: [{ model: CursoTemas, as: 'tema' }, { model: Sector, as: 'sector' }] })
	return courses.map(c => c.get({ plain: true }))
};

export const getAllCursoTemas = async (where) => {
	const cursoTemas = await CursoTemas.findAll({ where: { Id: {[Op.ne]: 0} }})
	return cursoTemas.map(c => c.get({ plain: true }))
};
