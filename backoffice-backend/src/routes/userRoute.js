import express from "express";
import controller from "../controllers/userController.js";
import verifyToken from "../middleware/validateToken.js";
import { check } from "express-validator";
import { passwordValidator } from "../middleware/validators/newPasswordValidator.js";
import { userValidator } from "../middleware/validators/userValidator.js";
import onlyAgencyAndAdministrators from "../middleware/onlyAgencyAndAdministrators.js";

const router = express.Router();

router.post("/login", controller.login);
router.post("/change-password", verifyToken, check("currentPassword").notEmpty(),passwordValidator("newPassword"), controller.changePassword);
router.post("/create", verifyToken, onlyAgencyAndAdministrators(), userValidator(), passwordValidator("password"), controller.create);
router.get("/", controller.getAll);
router.delete("/:id", verifyToken, onlyAgencyAndAdministrators(), controller.deleteById);
router.put("/:id", verifyToken, onlyAgencyAndAdministrators(), controller.update);

export default router;
