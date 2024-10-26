import * as docService from "../../services/iso/docService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/docs [GET]
   * @returns 200 and array of @Course
   */
  getAll: async (req, res, next) => {
    try {
      const docs = await docService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(docs));
    } catch (e) {
      next(e);
    }
  },

};