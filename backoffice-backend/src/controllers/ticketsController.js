import * as ticketsService from "../services/ticketsService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  
  /**
   * /tickets [GET]
   * @returns 200 and array of @Ticket
   */
  getAll: async (req, res, next) => {
    try {
      const tickets = await ticketsService.getAll();
      res.status(200).json(toLowerCaseRelations(tickets));
    } catch (e) {
      next(e);
    }
  },

};