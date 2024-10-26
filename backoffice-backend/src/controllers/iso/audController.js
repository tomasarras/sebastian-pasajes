import * as audService from "../../services/iso/audService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/aud [GET]
   * @returns 200 and array of @AUD
   */
  getAll: async (req, res, next) => {
    try {
      const aud = await audService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(aud));
    } catch (e) {
      next(e);
    }
  },

};