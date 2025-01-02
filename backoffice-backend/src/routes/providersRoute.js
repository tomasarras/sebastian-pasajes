import express from "express";
import controller from "../controllers/providerController.js";
import verifyToken from "../middleware/validateToken.js";
import withPermissions from "../middleware/withPermissions.js";
import { USER_PROFILES } from "../utils/constants.js";

const router = express.Router();

router.get("/", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.VENDEDOR, USER_PROFILES.VENTAS_ADMINISTRADOR]), controller.getAll);
router.post("/", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.VENTAS_ADMINISTRADOR]), controller.create);
router.put("/:id", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.VENTAS_ADMINISTRADOR]), controller.update);
router.delete("/:id", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.VENTAS_ADMINISTRADOR]), controller.deleteById);

export default router;
