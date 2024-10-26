import * as localitiesService from "../services/localitiesService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /localities [GET]
   * @returns 200 and array of @Locality
   */
  getAll: async (req, res, next) => {
    try {
      const localities = await localitiesService.getAll();
      res.status(200).json(toLowerCaseRelations(localities));
    } catch (e) {
      next(e);
    }
  },

};