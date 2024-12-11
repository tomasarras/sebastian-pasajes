import express from "express";
import controller from "../controllers/userController.js";
import verifyToken from "../middleware/validateToken.js";
import { check } from "express-validator";
import { passwordValidator } from "../middleware/validators/newPasswordValidator.js";
import { userValidator } from "../middleware/validators/userValidator.js";
import onlyAdministrators from "../middleware/onlyAdministrators.js";
import withPermissions from "../middleware/withPermissions.js";
import { USER_PROFILES } from "../utils/constants.js";

const router = express.Router();

router.post("/login", controller.login);
router.post("/change-password", verifyToken, check("currentPassword").notEmpty(),passwordValidator("newPassword"), controller.changePassword);
router.post("/:username/change-password", verifyToken, onlyAdministrators, passwordValidator("newPassword"), controller.changePasswordAsAdmin);
router.post("/", verifyToken, onlyAdministrators, userValidator(), passwordValidator("password"), controller.create);
router.get("/", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.VENDEDOR]), controller.getAll);
router.delete("/:username", verifyToken, onlyAdministrators, controller.deleteByUsername);

export default router;
