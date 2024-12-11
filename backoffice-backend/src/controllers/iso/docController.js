import * as docService from "../../services/iso/docService.js";
import { USER_PROFILES } from "../../utils/constants.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/docs [GET]
   * @returns 200 and array of @IsoDocTipo
   */
  getAll: async (req, res, next) => {
    try {
      const docs = await docService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(docs));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/docs/iso [GET]
   * @returns 200 and array of @IsoDoc
   */
  getAllIsoDoc: async (req, res, next) => {
    try {
      let idPuesto = null;
      const role = req.user.role;
      if (role != USER_PROFILES.WEBMASTER && role != USER_PROFILES.ADMIN) {
        const puestoPersonal = req.user?.personal?.id
        if (puestoPersonal) {
          idPuesto = puestoPersonal
        }
      }
      const docs = await docService.getAllIsoDoc(req.query, idPuesto);
      res.status(200).json(toLowerCaseRelations(docs));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/docs/procesos [GET]
   * @returns 200 and array of @IsoProceso
   */
  getAllIsoProcesos: async (req, res, next) => {
    try {
      const procesos = await docService.getAllIsoProcesos(req.query);
      res.status(200).json(toLowerCaseRelations(procesos));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/docs/estados [GET]
   * @returns 200 and array of @IsoDocEstado
   */
  getAllIsoDocEstados: async (req, res, next) => {
    try {
      const estados = await docService.getAllIsoDocEstados(req.query);
      res.status(200).json(toLowerCaseRelations(estados));
    } catch (e) {
      next(e);
    }
  },

};