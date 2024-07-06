import * as usersService from "../services/usersService.js";
import { toLowerCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /users/login [POST]
   * @returns 200 and token
   */
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const token = await usersService.login(username, password);
      res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  },

  /**
   * /users/change-password [POST]
   * @returns 200
   */
  changePassword: async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;
      await usersService.changePassword(currentPassword, newPassword, req.user);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /users/create [POST]
   * @returns 200 and @User
   */
  create: async (req, res, next) => {
    try {
      const createdUser = await usersService.create(req.body);
      res.status(200).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  /**
   * /users [GET]
   * @returns 200 and array of @User
   */
  getAll: async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      res.status(200).json(toLowerCaseRelations(users));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /users/{id} [PUT]
   * @returns 200 and @User
   */
  update: async (req, res, next) => {
    try {
      const updatedUser = await usersService.update(req.params.id, req.body);
      res.status(200).json(toLowerCaseRelations(updatedUser));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /users/{id} [DELETE]
   * @returns 204 no content
   */
  deleteById: async (req, res, next) => {
    try {
      await usersService.deleteById(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

};