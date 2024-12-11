import * as clientsService from "../services/clientsService.js";
import { toLowerCaseRelations, toPascalCaseRelations } from "../utils/functions.js";

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
      const updatedClient = await clientsService.update(req.params.id, toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(updatedClient));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /clients [POST]
   * @returns 201 and created @Client
   */
  create: async (req, res, next) => {
    try {
      const newClient = await clientsService.create(toPascalCaseRelations(req.body));
      res.status(201).json(toLowerCaseRelations(newClient));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /clients/{id} [DELETE]
   * @returns 200 and deleted @Client
   */
  deleteById: async (req, res, next) => {
    try {
      const deletedClient = await clientsService.deleteById(req.params.id);
      res.status(200).json(toLowerCaseRelations(deletedClient[0]));
    } catch (e) {
      next(e);
    }
  },
};