import * as coursesService from "../../services/iso/coursesService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/courses [GET]
   * @returns 200 and array of @Course
   */
  getAll: async (req, res, next) => {
    try {
      const courses = await coursesService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(courses));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/courses/programacion [GET]
   * @returns 200 and array of @CourseProgramacion
   */
  getAllCursosProgramacion: async (req, res, next) => {
    try {
      const courses = await coursesService.getAllCursosProgramacion(req.query);
      res.status(200).json(toLowerCaseRelations(courses));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/courses/programacion/{id} [DELETE]
   * @returns 204
   */
  deleteCursoProgramacion: async (req, res, next) => {
    try {
      await coursesService.deleteCursoProgramacion(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/courses/temas [GET]
   * @returns 200 and array of @CourseTemas
   */
  getAllCursoTemas: async (req, res, next) => {
    try {
      const cursoTemas = await coursesService.getAllCursoTemas(req.query);
      res.status(200).json(toLowerCaseRelations(cursoTemas));
    } catch (e) {
      next(e);
    }
  },

};