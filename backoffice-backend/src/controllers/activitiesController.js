import * as activitiesService from "../services/activitiesService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /** 
   * /activities [GET]
   * @returns 200 and array of @Activity
   */
  getAll: async (req, res, next) => {
    try {
      const activities = await activitiesService.getAll(req.query); 
      res.status(200).json(toLowerCaseRelations(activities));
    } catch (e) {
      next(e);
    }
  },

};
