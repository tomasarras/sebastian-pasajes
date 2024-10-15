//import * as ncService from "../../services/iso/ncService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/nc [GET]
   * @returns 200 and array of @Client
   */
  getAll: async (req, res, next) => {
    try {
      //const nc = await ncService.getAll();
      //res.status(200).json(toLowerCaseRelations(nc));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};