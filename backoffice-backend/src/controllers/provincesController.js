//import * as provincesService from "../../services/provincesService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /provinces [GET]
   * @returns 200 and array of @Province
   */
  getAll: async (req, res, next) => {
    try {
      //const provinces = await provincesService.getAll();
      //res.status(200).json(toLowerCaseRelations(provinces));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};