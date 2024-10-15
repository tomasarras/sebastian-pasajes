//import * as sectorService from "../../services/sectorService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /sectors [GET]
   * @returns 200 and array of @Sector
   */
  getAll: async (req, res, next) => {
    try {
      //const sectors = await sectorService.getAll();
      //res.status(200).json(toLowerCaseRelations(sectors));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};