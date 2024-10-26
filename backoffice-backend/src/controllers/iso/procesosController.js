import * as procesosService from "../../services/iso/procesosService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/procesos [GET]
   * @returns 200 and array of @Proceso
   */
  getAll: async (req, res, next) => {
    try {
      const procesos = await procesosService.getAll();
      res.status(200).json(toLowerCaseRelations(procesos));
    } catch (e) {
      next(e);
    }
  },

};