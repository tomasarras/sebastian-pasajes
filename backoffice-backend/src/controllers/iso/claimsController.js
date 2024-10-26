import * as claimService from "../../services/iso/claimService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/claims/c [GET]
   * @returns 200 and array of @Claim
   */
  getAllC: async (req, res, next) => {
    try {
      const claims = await claimService.getAllC();
      res.status(200).json(toLowerCaseRelations(claims));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/claims/t [GET]
   * @returns 200 and array of @Claim
   */
  getAllT: async (req, res, next) => {
    try {
      const claims = await claimService.getAllT();
      res.status(200).json(toLowerCaseRelations(claims));
    } catch (e) {
      next(e);
    }
  },

};