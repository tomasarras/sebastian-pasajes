import * as indicatorsService from "../../services/iso/indicatorsService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/indicator [GET]
   * @returns 200 and array of @Indicator
   */
  getAll: async (req, res, next) => {
    try {
      const indicators = await indicatorsService.getAll();
      res.status(200).json(toLowerCaseRelations(indicators));
    } catch (e) {
      next(e);
    }
  },

};