//import * as staffService from "../services/staffService.js";

export default {
  
  /**
   * /staff [GET]
   * @returns 200 and array of @Staff
   */
  getAll: async (req, res, next) => {
    try {
      //const staff = await staffService.getAll();
      //res.status(200).json(staff);
      //TODO: get news from db
      res.status(200).json([]);
    } catch (e) {
      next(e);
    }
  },

};