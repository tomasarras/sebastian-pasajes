import * as encuestasService from "../../services/iso/encuestasService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/encuestas/cor [GET]
   * @returns 200 and array of @Encuesta
   */
  getAllCor: async (req, res, next) => {
    try {
      const encuestas = await encuestasService.getAllCor(req.query);
      res.status(200).json(toLowerCaseRelations(encuestas));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/encuestas/issn [GET]
   * @returns 200 and array of @Encuesta
   */
  getAllIssn: async (req, res, next) => {
    try {
      const encuestas = await encuestasService.getAllIssn(req.query);
      res.status(200).json(toLowerCaseRelations(encuestas));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/encuestas/tur [GET]
   * @returns 200 and array of @Encuesta
   */
  getAllTur: async (req, res, next) => {
    try {
      const encuestas = await encuestasService.getAllTur(req.query);
      res.status(200).json(toLowerCaseRelations(encuestas));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/encuestas/turr [GET]
   * @returns 200 and array of @Encuesta
   */
  getAllTurr: async (req, res, next) => {
    try {
      const encuestas = await encuestasService.getAllTurr(req.query);
      res.status(200).json(toLowerCaseRelations(encuestas));
    } catch (e) {
      next(e);
    }
  },

};