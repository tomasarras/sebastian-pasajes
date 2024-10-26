import * as newsService from "../services/newsService.js";
import { toLowerCaseRelations, toPascalCaseRelations } from "../utils/functions.js";

export default {
  
  /**
   * /news [GET]
   * @returns 200 and array of @News
   */
  getAll: async (req, res, next) => {
    try {
      const news = await newsService.getAll();
      res.status(200).json(toLowerCaseRelations(news));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /news/{id} [PUT]
   * @returns 200 and updated @New
   */
  update: async (req, res, next) => {
    try {
      const updatedNew = await newsService.update(req.params.id, toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(updatedNew));
    } catch (e) {
      next(e);
    }
  },

};