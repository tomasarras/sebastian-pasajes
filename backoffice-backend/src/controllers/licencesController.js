//import * as lecencesService from "../services/lecencesService.js";

export default {
  
  /**
   * /licences/staff [GET]
   * @returns 200 and array of @News
   */
  getAllStaff: async (req, res, next) => {
    try {
      //const staff = await lecencesService.getAllStaff();
      //res.status(200).json(staff);
      //TODO: get news from db
      res.status(200).json([]);
    } catch (e) {
      next(e);
    }
  },

};