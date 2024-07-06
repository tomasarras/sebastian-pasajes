import { StatusCodes } from "http-status-codes";
import * as locationService from "../services/locationsService.js";
import { ROLES, STATUSES } from "../utils/constants.js";
import { throwErrorIfNotExists, toLowerCaseRelations } from "../utils/functions.js";

export default {

   /**
   * /locations [GET]
   * @returns 200 and array of @Location
   */
   getAll: async (req, res, next) => {
    try {
      const locations = await locationService.getAll();
      res.status(200).json(toLowerCaseRelations(locations));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /locations/{id} [GET]
   * @returns 200 and @Location
   */
  getById: async (req, res, next) => {
    try {
      let location = await locationService.getById(req.params.id);
      throwErrorIfNotExists(location, "location");
      res.status(200).json(toLowerCaseRelations(location));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /locations [POST]
   * @returns 200 and @Location
   */
  create: async (req, res, next) => {
    try {
      const createdLocation = await locationService.create(req.body);
      res.status(200).json(toLowerCaseRelations(createdLocation));
    } catch (e) {
      next(e);
    }
  }, 

  /**
   * /locations/{id} [PUT]
   * @returns 200 and updated @Location
   */
  update: async (req, res, next) => {
    try {
      const updatedLocation = await locationService.update(req.params.id, req.body);
      res.status(200).json(toLowerCaseRelations(updatedLocation));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /locations/{id} [DELETE]
   * @returns 204 no content if was deleted
   */
  deleteById: async (req, res, next) => {
    try {
      await locationService.deleteById(req.params.id)
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

};