import * as criteriasService from "../../services/iso/criteriasService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/criterias [GET]
   * @returns 200 and array of @Criteria
   */
  getAll: async (req, res, next) => {
    try {
      const criterias = await criteriasService.getAll();
      res.status(200).json(toLowerCaseRelations(criterias));
    } catch (e) {
      next(e);
    }
  },

};