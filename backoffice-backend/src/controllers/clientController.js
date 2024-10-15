//import * as clientsService from "../services/clientsService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /clients [GET]
   * @returns 200 and array of @Client
   */
  getAll: async (req, res, next) => {
    try {
      //const clients = await clientsService.getAll();
      //res.status(200).json(toLowerCaseRelations(clients));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};