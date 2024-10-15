//import * as ticketsService from "../services/ticketsService.js";

export default {
  
  /**
   * /tickets [GET]
   * @returns 200 and array of @Ticket
   */
  getAll: async (req, res, next) => {
    try {
      //const tickets = await ticketsService.getAll();
      //res.status(200).json(tickets);
      //TODO: get news from db
      res.status(200).json([]);
    } catch (e) {
      next(e);
    }
  },

};