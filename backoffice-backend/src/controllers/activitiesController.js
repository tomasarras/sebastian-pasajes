//import * as activitiesService from "../services/activitiesService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /activities [GET]
   * @returns 200 and array of @Activity
   */
  getAll: async (req, res, next) => {
    try {
      //const activities = await activitiesService.getAll();
      //res.status(200).json(toLowerCaseRelations(activities));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};