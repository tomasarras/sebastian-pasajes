import { Op } from "sequelize";
import { Curso, CursoTemas, Sector, CursosProgramacion, Personal } from "../../db/index.js"
import { filterAttributes, replaceFields } from "../../utils/functions.js";

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

export const getAllCursosProgramacion = async () => {
	const cursosProgramacion = await CursosProgramacion.findAll({ include: [
		{ model: Personal, as: 'cursosProgramacionPersonal' },
		{ model: Curso, as: 'cursosProgramacionCurso' }] })
	return replaceFields({cursosProgramacionPersonal: 'personal', cursosProgramacionCurso: 'curso'}, cursosProgramacion.map(c => c.get({ plain: true })))
};

export const deleteCursoProgramacion = async (id) => {
	const cursoProgramacion = await CursosProgramacion.findOne({ where: { Id: id }})
	return cursoProgramacion.destroy()
};

export const getAllCursoTemas = async () => {
	const cursoTemas = await CursoTemas.findAll({ where: { Id: {[Op.ne]: 0} }})
	return cursoTemas.map(c => c.get({ plain: true }))
};
