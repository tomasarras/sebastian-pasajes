import * as provincesService from "../services/provincesService.js";
import { throwErrorIfNotExists, toLowerCaseRelations } from "../utils/functions.js";

export default {

  /**
   * /provinces [GET]
   * @returns 200 and array of @Province
   */
  getAll: async (req, res, next) => {
    try {
      const provinces = await provincesService.getAll();
      res.status(200).json(toLowerCaseRelations(provinces));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /provinces/{id} [GET]
   * @returns 200 and @Province
   */
  getById: async (req, res, next) => {
    try {
      const province = await provincesService.getById(req.params.id);
      throwErrorIfNotExists(province, "province");
      res.status(200).json(toLowerCaseRelations(province));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /provinces [POST]
   * @returns 200 and @Province
   */
  create: async (req, res, next) => {
    try {
      const createdProvince = await provincesService.create(req.body);
      res.status(200).json(toLowerCaseRelations(createdProvince));
    } catch (e) {
      next(e);
    }
  }, 

  /**
   * /provinces/{id} [PUT]
   * @returns 200 and updated @Province
   */
  update: async (req, res, next) => {
    try {
      const updatedProvince = await provincesService.update(req.params.id, req.body);
      res.status(200).json(toLowerCaseRelations(updatedProvince));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /provinces/{id} [DELETE]
   * @returns 204 no content if was deleted
   */
  deleteById: async (req, res, next) => {
    try {
      await provincesService.deleteById(req.params.id)
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

};