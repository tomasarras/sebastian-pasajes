import express from "express";
import controller from "../controllers/activitiesController.js";
import verifyToken from "../middleware/validateToken.js";
import onlyAdministrators from "../middleware/onlyAdministrators.js";
import { verifyLicences } from "../services/staffService.js";

const router = express.Router();

router.get("/", verifyToken, onlyAdministrators, controller.getAll);
router.put("/:id", verifyLicences, onlyAdministrators, controller.getAll);//TODO:
router.delete("/:id", verifyLicences, onlyAdministrators, controller.getAll);//TODO:
router.post("/:id", verifyLicences, onlyAdministrators, controller.getAll);//TODO:

export default router;
