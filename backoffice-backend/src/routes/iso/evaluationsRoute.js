import express from "express";
import controller from "../../controllers/iso/evaluationsController.js";
import onlyAdministrators from "../../middleware/onlyAdministrators.js";
import verifyToken from "../../middleware/validateToken.js";

const router = express.Router();

router.get("/sells", verifyToken, onlyAdministrators, controller.getAllSells);
router.get("/evc", verifyToken, onlyAdministrators, controller.getAllEvc);
router.get("/adm", verifyToken, onlyAdministrators, controller.getAllAdm);

export default router;
