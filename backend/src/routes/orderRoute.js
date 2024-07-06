import express from "express";
import controller from "../controllers/orderController.js";
import verifyToken from "../middleware/validateToken.js";
import { validateOrder } from "../middleware/validators/orderValidator.js"
import withPermissions from "../middleware/withPermissions.js"
import { ROLES } from "../utils/constants.js";
const router = express.Router();

const allRolesExceptAuditor = [ROLES.UNASSIGNED, ROLES.APPLICANT, ROLES.AUTHORIZER, ROLES.AGENT, ROLES.ADMIN]

router.get("/", verifyToken, controller.getAll);
router.post("/", validateOrder, verifyToken, withPermissions(allRolesExceptAuditor), controller.create);
router.put("/:id", verifyToken, withPermissions(allRolesExceptAuditor), controller.update);
router.put("/:id/authorize", verifyToken, withPermissions(allRolesExceptAuditor), controller.authorize);
router.put("/:id/reject", verifyToken, withPermissions(allRolesExceptAuditor), controller.reject);
router.put("/:id/cancel", verifyToken, withPermissions(allRolesExceptAuditor), controller.cancel);
router.put("/:id/open", verifyToken, withPermissions(allRolesExceptAuditor), controller.open);
router.put("/:id/close", verifyToken, withPermissions(allRolesExceptAuditor), controller.close);
router.get("/:id", verifyToken, controller.getById);
router.delete("/:id", verifyToken, withPermissions([ROLES.UNASSIGNED, ROLES.APPLICANT, ROLES.AUTHORIZER, ROLES.ADMIN]), controller.deleteById);

export default router;
