import * as parametersService from "../services/parametersService.js";
import { toLowerCaseRelations, toPascalCaseRelations } from "../utils/functions.js";

export default {
  
  /**
   * /parameters [GET]
   * @returns 200 and @Parameter
   */
  getParameters: async (req, res, next) => {
    try {
      const parameters = await parametersService.getParameters();
      res.status(200).json(toLowerCaseRelations(parameters));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /parameters [PUT]
   * @returns 200 and @Parameter
   */
  update: async (req, res, next) => {
    try {
      delete req.body.id
      await parametersService.update(toPascalCaseRelations(req.body));
      parametersService.sendTestsEmails();
      const parameters = await parametersService.getParameters();
      res.status(200).json(toLowerCaseRelations(parameters));
    } catch (e) {
      next(e);
    }
  },

};