import * as provincesService from "../services/provincesService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /provinces [GET]
   * @returns 200 and array of @Province
   */
  getAll: async (req, res, next) => {
    try {
      const provinces = await provincesService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(provinces));
    } catch (e) {
      next(e);
    }
  },

};