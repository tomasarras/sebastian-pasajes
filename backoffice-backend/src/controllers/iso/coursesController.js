//import * as coursesService from "../../services/iso/coursesService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/courses [GET]
   * @returns 200 and array of @Course
   */
  getAll: async (req, res, next) => {
    try {
      //const courses = await coursesService.getAll();
      //res.status(200).json(toLowerCaseRelations(courses));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};