import * as clientService from "../services/clientsService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /clients [GET]
   * @returns 200 and array of @Client
   */
  getAll: async (req, res, next) => {
    try {
      const clients = await clientService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(clients));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /clients [POST]
   * @returns 200 and @Client
   */
  create: async (req, res, next) => {
    try {
      const createdClient = await clientService.create(req.body);
      res.status(200).json(toLowerCaseRelations(createdClient));
    } catch (e) {
      next(e);
    }
  }, 

  /**
   * /clients/{id} [PUT]
   * Not allowed to auditors
   * @returns 200 and updated @Client
   */
  update: async (req, res, next) => {
    try {
      const updatedClient = await clientService.update(req.params.id, req.body);
      res.status(200).json(toLowerCaseRelations(updatedClient));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /clients/{id} [GET]
   * @returns 200 and @Client
   */
  getById: async (req, res, next) => {
    try {
      const client = await clientService.getById(req.params.id);
      res.status(200).json(toLowerCaseRelations(client));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /clients/{id} [DELETE]
   * @returns 204 no content if was deleted
   */
  deleteById: async (req, res, next) => {
    try {
      await clientService.deleteById(req.params.id)
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

};