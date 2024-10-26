import * as ncService from "../../services/iso/ncService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/nc [GET]
   * @returns 200 and array of @Client
   */
  getAll: async (req, res, next) => {
    try {
      const nc = await ncService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(nc));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/origins [GET]
   * @returns 200 and array of @Client
   */
  getAllOrigins: async (req, res, next) => {
    try {
      const nc = await ncService.getAllOrigen(req.query);
      res.status(200).json(toLowerCaseRelations(nc));
    } catch (e) {
      next(e);
    }
  },
  

};