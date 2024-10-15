//import * as providersService from "../services/providersService.js";

export default {
  
  /**
   * /providers [GET]
   * @returns 200 and array of @Provider
   */
  getAll: async (req, res, next) => {
    try {
      //const providers = await providersService.getAll();
      //res.status(200).json(providers);
      //TODO: get news from db
      res.status(200).json([]);
    } catch (e) {
      next(e);
    }
  },

};