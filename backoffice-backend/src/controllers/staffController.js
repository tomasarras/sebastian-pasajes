import * as staffService from "../services/staffService.js";
import { toLowerCaseRelations, toPascalCaseRelations } from "../utils/functions.js";

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
   * /staff/puestos [GET]
   * @returns 200 and array of @Puesto
   */
  getAllPuestos: async (req, res, next) => {
    try {
      const puestos = await staffService.getAllPuestos();
      res.status(200).json(toLowerCaseRelations(puestos));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/puestos/{id} [DELETE]
   * @returns 204
   */
  deletePuestoById: async (req, res, next) => {
    try {
      await staffService.deletePuestoById(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/puestos [POST]
   * @returns 200 and @Puesto
   */
  createPuesto: async (req, res, next) => {
    try {
      const puesto = await staffService.createPuesto(toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(puesto));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences/types [GET]
   * @returns 200 and array of @Puesto
   */
  getAllLicenciasTipo: async (req, res, next) => {
    try {
      const licenciasTipo = await staffService.getAllLicenciasTipo();
      res.status(200).json(toLowerCaseRelations(licenciasTipo));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences/types [DELETE]
   * @returns 204
   */
  deleteLicenciaTipoById: async (req, res, next) => {
    try {
      await staffService.deleteLicenciaTipoById(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /staff/licences/types [POST]
   * @returns 200 with @LicenciaTipo
   */
  createLicenciaTipo: async (req, res, next) => {
    try {
      const licenciaTipo = await staffService.createLicenciaTipo(toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(licenciaTipo));
    } catch (e) {
      next(e);
    }
  },

   /**
   * /staff/feriados [GET]
   * @returns 200 and array of @Feriado
   */
   getAllFeriados: async (req, res, next) => {
    try {
      const feriados = await staffService.getAllFeriados();
      res.status(200).json(toLowerCaseRelations(feriados));
    } catch (e) {
      next(e);
    }
  },

   /**
   * /staff/feriados [POST]
   * @returns 200 and array of @Feriado
   */
   createFeriado: async (req, res, next) => {
    try {
      const feriado = await staffService.createFeriado(toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(feriado));
    } catch (e) {
      next(e);
    }
  },

   /**
   * /staff/feriados/:id [DELETE]
   * @returns 200 
   */
   deleteFeriadoById: async (req, res, next) => {
    try {
      await staffService.deleteFeriadoById(req.params.id);
      res.status(204).send();
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

  create: async (req, res, next) => {
    try {
      const newStaff = await staffService.create(toPascalCaseRelations(req.body));
      res.status(201).json(toLowerCaseRelations(newStaff));
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const updatedStaff = await staffService.update(req.params.id, toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(updatedStaff));
    } catch (e) {
      next(e);
    }
  },

  deleteById: async (req, res, next) => {
    try {
      const deletedStaff = await staffService.deleteById(req.params.id);
      res.status(200).json(toLowerCaseRelations(deletedStaff));
    } catch (e) {
      next(e);
    }
  },

};