import * as ncService from "../../services/iso/ncService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/nc [GET]
   * @returns 200 and array of @NC
   */
  getAll: async (req, res, next) => {
    try {
      const nc = await ncService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(nc));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/origins [GET]
   * @returns 200 and array of @NC
   */
  getAllOrigins: async (req, res, next) => {
    try {
      const nc = await ncService.getAllOrigen(req.query);
      res.status(200).json(toLowerCaseRelations(nc));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/origins/{id} [GET]
   * @returns 200 @NC
   */
  getById: async (req, res, next) => {
    try {
      const nc = await ncService.getById(req.params.id);
      res.status(200).json(toLowerCaseRelations(nc));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/nc/notify-participants [PUT]
   * @returns 200 @NC
   */
  notifyParticipants: async (req, res, next) => {
    try {
      const nc = await ncService.notifyParticipants(req.query.ncId);
      res.status(200).json(toLowerCaseRelations(nc));
    } catch (e) {
      next(e);
    }
  },
  

};