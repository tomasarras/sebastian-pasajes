import * as audService from "../../services/iso/audService.js";
import { toLowerCaseRelations } from "../../utils/functions.js";

export default {
  /**
   * /iso/aud [GET]
   * @returns 200 and array of @AUD
   */
  getAll: async (req, res, next) => {
    try {
      const aud = await audService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(aud));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/aud/:id [GET]
   * @returns 200 and @AUD object
   */
  getAudById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const aud = await audService.getById(id);
      if (!aud) {
        return res.status(404).json({ message: "Auditoría no encontrada" });
      }
      res.status(200).json(toLowerCaseRelations(aud));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/aud/:id [PUT]
   * @returns 200 and updated @AUD object
   */
  updateAud: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedAud = await audService.update(id, req.body);
      if (!updatedAud) {
        return res.status(404).json({ message: "Auditoría no encontrada" });
      }
      res.status(200).json(toLowerCaseRelations(updatedAud));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /iso/aud/:id [DELETE]
   * @returns 200 and success message
   */
  deleteAud: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await audService.remove(id);
      if (!deleted) {
        return res.status(404).json({ message: "Auditoría no encontrada" });
      }
      res.status(200).json({ message: "Auditoría eliminada correctamente" });
    } catch (e) {
      next(e);
    }
  }
};