import express from "express";
import controller from "../../controllers/iso/encuestasController.js";
import verifyToken from "../../middleware/validateToken.js";
import onlyAdministrators from "../../middleware/onlyAdministrators.js";
import withPermissions from "../../middleware/withPermissions.js";
import { USER_PROFILES } from "../../utils/constants.js";


const router = express.Router();

router.get("/cor", verifyToken, onlyAdministrators, controller.getAllCor);
router.get("/issn", verifyToken, onlyAdministrators, controller.getAllIssn);
router.get("/tur", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.ENCUESTA_SATISFACCION]), controller.getAllTur);
router.get("/turr", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER, USER_PROFILES.ENCUESTA_SATISFACCION]), controller.getAllTurr);

export default router;
