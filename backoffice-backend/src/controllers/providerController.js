import * as providersService from "../services/providersService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  
  /**
   * /providers [GET]
   * @returns 200 and array of @Provider
   */
  getAll: async (req, res, next) => {
    try {
      const providers = await providersService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(providers));
    } catch (e) {
      next(e);
    }
  },

};