import * as excelService from "../services/excelService.js";

export default {
  
  /**
   * /excel/staff [GET]
   * @returns 200 excel
   */
  getStaffLicences: async (req, res, next) => {
    try {
      await excelService.getStaffLicences(req.query, res)
    } catch (e) {
      next(e);
    }
  },

  /**
   * /excel/request-vacations [GET]
   * @returns 200 excel
   */
  requestVacations: async (req, res, next) => {
    try {
      await excelService.requestVacations(req.query.idPersonal, res)
    } catch (e) {
      next(e);
    }
  },

  /**
   * /excel/iso/nc [GET]
   * @returns 200 excel
   */
  isoNc: async (req, res, next) => {
    try {
      await excelService.isoNc(req.query.id, res)
    } catch (e) {
      next(e);
    }
  },

};