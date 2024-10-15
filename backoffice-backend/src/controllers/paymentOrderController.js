//import * as paymentOrdersService from "../services/paymentOrdersService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /clients [GET]
   * @returns 200 and array of @Client
   */
  getAll: async (req, res, next) => {
    try {
      //const paymentOrders = await paymentOrdersService.getAll();
      //res.status(200).json(toLowerCaseRelations(paymentOrders));
      //TODO: filtrar por props
      res.status(200).json(toLowerCaseRelations([]));
    } catch (e) {
      next(e);
    }
  },

};