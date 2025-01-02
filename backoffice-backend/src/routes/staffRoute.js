import express from "express";
import controller from "../controllers/staffController.js";
import { check } from "express-validator";
import { validateStaffLicence } from "../middleware/validators/staffLicenceValidator.js";
import verifyToken from "../middleware/validateToken.js"
import onlyAdministrators from "../middleware/onlyAdministrators.js";
import withPermissions from "../middleware/withPermissions.js";
import { USER_PROFILES } from "../utils/constants.js";

const router = express.Router();

router.get("/", verifyToken, controller.getAll);
router.get("/puestos", verifyToken, onlyAdministrators, controller.getAllPuestos);
router.delete("/puestos/:id", verifyToken, onlyAdministrators, controller.deletePuestoById);
router.post("/puestos", verifyToken, onlyAdministrators, controller.createPuesto);
router.get("/feriados", verifyToken, onlyAdministrators, controller.getAllFeriados);
router.post("/feriados", verifyToken, onlyAdministrators, controller.createFeriado);
router.delete("/feriados/:id", verifyToken, onlyAdministrators, controller.deleteFeriadoById);
router.get("/licences/types", verifyToken, onlyAdministrators, controller.getAllLicenciasTipo);
router.delete("/licences/types/:id", verifyToken, onlyAdministrators, controller.deleteLicenciaTipoById);
router.post("/licences/types", verifyToken, onlyAdministrators, controller.createLicenciaTipo);
router.get("/licences", verifyToken, onlyAdministrators, controller.getAllLicences);
router.post("/licences", verifyToken, onlyAdministrators, validateStaffLicence, controller.newLicence);
router.post("/licences/year", verifyToken, onlyAdministrators, controller.newLicenceByYear);
router.delete("/licences/year/:id", verifyToken, onlyAdministrators, controller.deleteLicenceByYear);
router.delete("/licences/:id", verifyToken, onlyAdministrators, controller.deleteLicence);
router.get("/licences/verify-licences", verifyToken, controller.verifyLicences);
router.post("/licences/request-licences", verifyToken, controller.requestLicences);
router.put("/licences/approve", verifyToken, onlyAdministrators, check('licencesId').isArray().notEmpty(), controller.approveLicences);
router.put("/licences/reject", verifyToken, onlyAdministrators, check('licencesId').isArray().notEmpty(), controller.rejectLicences);
router.post("/", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER]), controller.create);
router.put("/:id", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER]), controller.update);
router.delete("/:id", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER]), controller.deleteById);
router.get("/:id", verifyToken, withPermissions([USER_PROFILES.ADMIN, USER_PROFILES.WEBMASTER]), controller.getById);

export default router;
