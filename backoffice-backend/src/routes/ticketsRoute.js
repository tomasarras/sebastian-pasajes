import express from "express";
import controller from "../controllers/ticketsController.js";
import verifyToken from "../middleware/validateToken.js";
import withPermissions from "../middleware/withPermissions.js";
import { USER_PROFILES } from "../utils/constants.js";

const router = express.Router();

router.get("/", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.VENDEDOR]), controller.getAll);
router.post("/", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.VENDEDOR]), controller.create);
router.put("/:id", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.VENDEDOR]), controller.update);
router.delete("/:id", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.VENDEDOR]), controller.deleteById);
router.put("/:id/approve", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER]), controller.approveById);
router.put("/:id/cancel", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER]), controller.rejectById);

export default router;
