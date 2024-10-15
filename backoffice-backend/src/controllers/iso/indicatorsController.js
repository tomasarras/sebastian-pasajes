//import * as indicatorsService from "../../services/iso/indicatorsService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/indicator [GET]
   * @returns 200 and array of @Indicator
   */
  getAll: async (req, res, next) => {
    try {
      //const indicators = await indicatorsService.getAllSells();
      //res.status(200).json(toLowerCaseRelations(indicators));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};