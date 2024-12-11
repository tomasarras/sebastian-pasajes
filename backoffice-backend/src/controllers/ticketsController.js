import * as ticketsService from "../services/ticketsService.js";
import { toLowerCaseRelations, toPascalCaseRelations } from "../utils/functions.js";

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

  create: async (req, res, next) => {
    try {
      const newTicket = await ticketsService.create(toPascalCaseRelations(req.body));
      res.status(201).json(toLowerCaseRelations(newTicket));
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const updatedTicket = await ticketsService.update(req.params.id, toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(updatedTicket));
    } catch (e) {
      next(e);
    }
  },

  deleteById: async (req, res, next) => {
    try {
      const deletedTicket = await ticketsService.deleteById(req.params.id);
      res.status(200).json(toLowerCaseRelations(deletedTicket));
    } catch (e) {
      next(e);
    }
  },

  approveById: async (req, res, next) => {
    try {
      const approvedTicket = await ticketsService.approveById(req.params.id);
      res.status(200).json(toLowerCaseRelations(approvedTicket));
    } catch (e) {
      next(e);
    }
  },

  rejectById: async (req, res, next) => {
    try {
      const rejectedTicket = await ticketsService.rejectById(req.params.id);
      res.status(200).json(toLowerCaseRelations(rejectedTicket));
    } catch (e) {
      next(e);
    }
  }
};