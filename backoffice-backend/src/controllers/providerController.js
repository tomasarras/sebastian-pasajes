import * as providersService from "../services/providersService.js";
import { toLowerCaseRelations, toPascalCaseRelations } from "../utils/functions.js";

export default {
  
  /**
   * /providers [GET]
   * @returns 200 and array of @Provider
   */
  getAll: async (req, res, next) => {
    try {
      const providers = await providersService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(providers));
    } catch (e) {
      next(e);
    }
  },

  create: async (req, res, next) => {
    try {
      const newProvider = await providersService.create(toPascalCaseRelations(req.body));
      res.status(201).json(toLowerCaseRelations(newProvider));
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const updatedProvider = await providersService.update(req.params.id, toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(updatedProvider));
    } catch (e) {
      next(e);
    }
  },

  deleteById: async (req, res, next) => {
    try {
      const deletedProvider = await providersService.deleteById(req.params.id);
      res.status(200).json(toLowerCaseRelations(deletedProvider));
    } catch (e) {
      next(e);
    }
  },
};