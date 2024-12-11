import express from "express";
import controller from "../../controllers/iso/rgsController.js";
import verifyToken from "../../middleware/validateToken.js";
import withPermissions from "../../middleware/withPermissions.js";
import { USER_PROFILES } from "../../utils/constants.js";

const router = express.Router();

router.get("/", verifyToken, withPermissions([USER_PROFILES.VENDEDOR, USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER]), controller.getAll);

export default router;
