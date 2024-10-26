import express from "express";
import controller from "../controllers/staffController.js";
import { check } from "express-validator";
import { validateStaffLicence } from "../middleware/validators/staffLicenceValidator.js";
import verifyToken from "../middleware/validateToken.js"

const router = express.Router();

router.get("/", controller.getAll);
router.get("/licences", verifyToken, controller.getAllLicences);
router.post("/licences", verifyToken, validateStaffLicence, controller.newLicence);
router.delete("/licences/:id", controller.deleteLicence);
router.get("/licences/verify-licences", controller.verifyLicences);
router.post("/licences/request-licences", verifyToken, controller.requestLicences);
router.put("/licences/approve", check('licencesId').isArray().notEmpty(), controller.approveLicences);
router.put("/licences/reject", check('licencesId').isArray().notEmpty(), controller.rejectLicences);

export default router;
