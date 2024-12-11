import express from "express";
import controller from "../controllers/localitiesController.js";
import { verifyLicences } from "../services/staffService.js";
import onlyAdministrators from "../middleware/onlyAdministrators.js";
const router = express.Router();

router.get("/", controller.getAll);
router.put("/:id", verifyLicences, onlyAdministrators, controller.getAll);//TODO:
router.delete("/:id", verifyLicences, onlyAdministrators, controller.getAll);//TODO:
router.post("/:id", verifyLicences, onlyAdministrators, controller.getAll);//TODO:

export default router;
