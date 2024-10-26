import * as staffService from "../services/staffService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  
  /**
   * /staff [GET]
   * @returns 200 and array of @Staff
   */
  getAll: async (req, res, next) => {
    try {
      const staff = await staffService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(staff));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences [GET]
   * @returns 200 and array of @StaffLicence
   */
  getAllLicences: async (req, res, next) => {
    try {
      const idPersonal = req.query.idPersonal || req.user.idPersonal
      const licences = await staffService.getAllLicences({ idPersonal });
      res.status(200).json(toLowerCaseRelations(licences));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences [POST]
   * @returns 200 with @StaffLicence
   */
  newLicence: async (req, res, next) => {
    try {
      if (!("idPersonal" in req.body)) {
        req.body.idPersonal = req.user.idPersonal
      }
      const licence = await staffService.newLicence(req.body);
      res.status(200).json(toLowerCaseRelations(licence));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences/{id} [DELETE]
   * @returns 204
   */
  deleteLicence: async (req, res, next) => {
    try {
      await staffService.deleteLicence(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences/verify-licences [GET]
   * @returns 200
   */
  verifyLicences: async (req, res, next) => {
    try {
      const result = await staffService.verifyLicences(req.query.idPersonal);
      res.status(200).json(toLowerCaseRelations(result));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences/request-licences [POST]
   * @returns 200
   */
  requestLicences: async (req, res, next) => {
    try {
      const idPersonal = req.user.idPersonal
      await staffService.requestLicences(idPersonal);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences/approve [PUT]
   * @returns 204
   */
  approveLicences: async (req, res, next) => {
    try {
      await staffService.approveLicences(req.body.licencesId);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences/reject [PUT]
   * @returns 204
   */
  rejectLicences: async (req, res, next) => {
    try {
      await staffService.rejectLicences(req.body.licencesId);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

};