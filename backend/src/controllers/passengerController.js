import * as passengersService from "../services/passengersService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /passengers [GET]
   * @returns 200 and array of @Passenger
   */
  getAll: async (req, res, next) => {
    try {
      const passengers = await passengersService.getAll(req.query, req.user);
      res.status(200).json(toLowerCaseRelations(passengers));
    } catch (e) {
      next(e);
    }
  }, 

};