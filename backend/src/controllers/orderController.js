import { StatusCodes } from "http-status-codes";
import * as ordersService from "../services/ordersService.js";
import { ROLES, STATUSES } from "../utils/constants.js";
import { toLowerCaseRelations } from "../utils/functions.js";

function throwErrorIfNotExists(order) {
  if (!order)
    throw { statusCode: StatusCodes.NOT_FOUND, message: "Order not found" };
}

function checkAuthorizerPermission(order, user) {
  if (user.role == ROLES.AUTHORIZER && order.clientId != user.client.id)
    throw { statusCode: StatusCodes.UNAUTHORIZED, message: "client id of the order does not match with user client id" }
}

function checkApplicantPermission(order, user) {
  if (user.role == ROLES.APPLICANT && order.applicantUserId != user.id)
    throw { statusCode: StatusCodes.UNAUTHORIZED, message: "applicant user id of the order does not match with user id" }
}

export default {
  /**
   * /orders [GET]
   * @returns 200 and array of @Order
   */
  getAll: async (req, res, next) => {
    try {
      const orders = await ordersService.getAll(req.query, req.user);
      res.status(200).json(toLowerCaseRelations(orders));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders [POST]
   * Not allowed to auditors
   * @returns 200 and @Order
   */
  create: async (req, res, next) => {
    try {
      const createdOrder = await ordersService.create(req.body, req.user);
      res.status(200).json(toLowerCaseRelations(createdOrder));
    } catch (e) {
      next(e);
    }
  }, 

  /**
   * /orders/{id} [PUT]
   * Not allowed to auditors
   * @returns 200 and updated @Order
   */
  update: async (req, res, next) => {
    try {
      const user = req.user
      const order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, user);
      checkApplicantPermission(order, user)
      checkApplicantPermission(order, user)
      const updatedOrder = await ordersService.update(req.params.id, req.body, user);
      res.status(200).json(toLowerCaseRelations(updatedOrder));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id} [GET]
   * @returns 200 and @Order
   */
  getById: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id);
      throwErrorIfNotExists(order);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(toLowerCaseRelations(order));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id} [DELETE]
   * @returns 204 no content if was deleted
   */
  deleteById: async (req, res, next) => {
    try {
      const user = req.user
      const order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, user);
      checkApplicantPermission(order, user)
      checkApplicantPermission(order, user)
      if (user.role == ROLES.APPLICANT || user.role == ROLES.AUTHORIZER) {
        const allowedStatusesToDelete = [STATUSES.OPEN, STATUSES.REJECTED, STATUSES.REJECTED_FROM_OPEN]
        if (!allowedStatusesToDelete.includes(order.Status.reservedName)) {
          throw { statusCode: StatusCodes.UNAUTHORIZED, message: "the order could not be deleted with the current status, insufficient permissions" }
        }
      }
      await ordersService.deleteOrder(order);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/authorize [PUT]
   * @returns 200 and @Order
   */
  authorize: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user)
      order = await ordersService.authorize(order, req.user);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/close [PUT]
   * @returns 200 and @Order
   */
  close: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user)
      order = await ordersService.close(order, req.user);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/reject [PUT]
   * @returns 200 and @Order
   */
  reject: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user);
      order = await ordersService.reject(order, req.user);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/cancel [PUT]
   * @returns 200 and @Order
   */
  cancel: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user);
      order = await ordersService.cancel(order, req.user);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/open [PUT]
   * @returns 200 and @Order
   */
  open: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user);
      order = await ordersService.open(order);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  },

};