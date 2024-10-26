import * as clientsService from "../services/clientsService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /clients [GET]
   * @returns 200 and array of @Client
   */
  getAll: async (req, res, next) => {
    try {
      const clients = await clientsService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(clients));
      //TODO: filtrar por props
    } catch (e) {
      next(e);
    }
  },

  /**
   * /clients/{id} [PUT]
   * @returns 200 and updated @Client
   */
  update: async (req, res, next) => {
    try {
      const updatedClient = await clientsService.update(req.params.id, req.body);
      res.status(200).json(toLowerCaseRelations(updatedClient));
    } catch (e) {
      next(e);
    }
  },

};