import * as trService from "../../services/iso/trService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/times-responses [GET]
   * @returns 200 and array of @TR
   */
  getAll: async (req, res, next) => {
    try {
      const times = await trService.getAll();
      res.status(200).json(toLowerCaseRelations(times));
    } catch (e) {
      next(e);
    }
  },

};