//import * as parametersService from "../services/parametersService.js";

export default {
  
  /**
   * /parameters [GET]
   * @returns 200 and array of @News
   */
  getAll: async (req, res, next) => {
    try {
      //const parameters = await parametersService.getAll();
      //res.status(200).json(parameters);
      //TODO: get news from db
      res.status(200).json([]);
    } catch (e) {
      next(e);
    }
  },

};