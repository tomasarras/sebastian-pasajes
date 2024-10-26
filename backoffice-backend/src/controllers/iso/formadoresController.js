import * as formadoresService from "../../services/iso/formadoresService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/formadores [GET]
   * @returns 200 and array of @RG
   */
  getAll: async (req, res, next) => {
    try {
      const formadores = await formadoresService.getAll();
      res.status(200).json(toLowerCaseRelations(formadores));
    } catch (e) {
      next(e);
    }
  },

};