//import * as surveysService from "../../services/iso/surveysService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/surveys/cor [GET]
   * @returns 200 and array of @Survey
   */
  getAllCor: async (req, res, next) => {
    try {
      //const surveys = await surveysService.getAllCor();
      //res.status(200).json(toLowerCaseRelations(surveys));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/surveys/issn [GET]
   * @returns 200 and array of @Survey
   */
  getAllIssn: async (req, res, next) => {
    try {
      //const surveys = await surveysService.getAllIssn();
      //res.status(200).json(toLowerCaseRelations(surveys));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/surveys/tur [GET]
   * @returns 200 and array of @Survey
   */
  getAllTur: async (req, res, next) => {
    try {
      //const surveys = await surveysService.getAllTur();
      //res.status(200).json(toLowerCaseRelations(surveys));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/surveys/turr [GET]
   * @returns 200 and array of @Survey
   */
  getAllTurr: async (req, res, next) => {
    try {
      //const surveys = await surveysService.getAllTurr();
      //res.status(200).json(toLowerCaseRelations(surveys));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};