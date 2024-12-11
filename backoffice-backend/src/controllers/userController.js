import * as usersService from "../services/usersService.js";
import { toLowerCaseRelations, toPascalCaseRelations } from "../utils/functions.js";

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
   * /users [POST]
   * @returns 200 and @User
   */
  create: async (req, res, next) => {
    try {
      const createdUser = await usersService.create(toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(createdUser));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /users/{username}/change-password [POST]
   * @returns 200 and @User
   */
  changePasswordAsAdmin: async (req, res, next) => {
    try {
      const { newPassword } = req.body;
      await usersService.changePasswordAsAdmin(newPassword, req.params.username);
      res.status(204).send();
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
   * /users/{username} [DELETE]
   * @returns 200 updated user
   */
  deleteByUsername: async (req, res, next) => {
    try {
      const user = await usersService.deleteByUsername(req.params.username);
      res.status(200).json(toLowerCaseRelations(user));
    } catch (e) {
      next(e);
    }
  },

};