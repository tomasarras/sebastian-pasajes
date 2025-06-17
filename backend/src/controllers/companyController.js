import * as companyService from "../services/companyService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {

  /**
   * /company [PUT]
   * @returns 200 and @Company
   */
  update: async (req, res, next) => {
    try {
      const company = await companyService.update(req.body);
      companyService.sendTestsEmails(req.body);
      res.status(200).json(toLowerCaseRelations(company));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /company [GET]
   * @returns 200 and @Company
   */
  get: async (req, res, next) => {
    try {
      const company = await companyService.get();
      res.status(200).json(toLowerCaseRelations(company));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /company/welcome [GET]
   * @returns 200 email text
   */
  getWelcome: async (req, res, next) => {
    try {
      const company = await companyService.get();
      res.status(200).json({ email: company.email });
    } catch (e) {
      next(e);
    }
  },

};