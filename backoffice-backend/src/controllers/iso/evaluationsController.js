//import * as evaluationsService from "../../services/iso/evaluationsService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/evaluations/sells [GET]
   * @returns 200 and array of @Evaluation
   */
  getAllSells: async (req, res, next) => {
    try {
      //const evaluations = await evaluationsService.getAllSells();
      //res.status(200).json(toLowerCaseRelations(evaluations));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/evaluations/evc [GET]
   * @returns 200 and array of @Evaluation
   */
  getAllEvc: async (req, res, next) => {
    try {
      //const evaluations = await evaluationsService.getAllEvc();
      //res.status(200).json(toLowerCaseRelations(evaluations));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/evaluations/adm [GET]
   * @returns 200 and array of @Evaluation
   */
  getAllAdm: async (req, res, next) => {
    try {
      //const evaluations = await evaluationsService.getAllAdm();
      //res.status(200).json(toLowerCaseRelations(evaluations));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};