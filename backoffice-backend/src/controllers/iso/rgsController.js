import * as rgService from "../../services/iso/rgService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/rg [GET]
   * @returns 200 and array of @RG
   */
  getAll: async (req, res, next) => {
    try {
      const rgs = await rgService.getAll();
      res.status(200).json(toLowerCaseRelations(rgs));
    } catch (e) {
      next(e);
    }
  },

};