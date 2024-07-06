import * as groupService from "../services/groupService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /groups [GET]
   * @returns 200 and array of @Group
   */
  getAll: async (req, res, next) => {
    try {
      const groups = await groupService.getAll();
      res.status(200).json(toLowerCaseRelations(groups));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /groups [POST]
   * @returns 200 and @Group
   */
  create: async (req, res, next) => {
    try {
      const createdGroup = await groupService.create(req.body.name);
      res.status(200).json(toLowerCaseRelations(createdGroup));
    } catch (e) {
      next(e);
    }
  }, 

  /**
   * /groups/{id} [PUT]
   * @returns 200 and updated @Group
   */
  update: async (req, res, next) => {
    try {
      const updatedGroup = await groupService.update(req.params.id, req.body.name);
      res.status(200).json(toLowerCaseRelations(updatedGroup));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /groups/{id} [GET]
   * @returns 200 and @Group
   */
  getById: async (req, res, next) => {
    try {
      const group = await groupService.getById(req.params.id);
      res.status(200).json(toLowerCaseRelations(group));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /groups/{id} [DELETE]
   * @returns 204 no content if was deleted
   */
  deleteById: async (req, res, next) => {
    try {
      await groupService.deleteById(req.params.id)
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

};