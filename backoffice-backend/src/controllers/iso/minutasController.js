import * as minutasService from "../../services/iso/minutasService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/minutas [GET]
   * @returns 200 and array of @Minuta
   */
  getAll: async (req, res, next) => {
    try {
      const minutas = await minutasService.getAll();
      res.status(200).json(toLowerCaseRelations(minutas));
    } catch (e) {
      next(e);
    }
  },

};