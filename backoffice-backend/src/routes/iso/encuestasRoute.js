import express from "express";
import controller from "../../controllers/iso/encuestasController.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/cor", controller.getAllCor);
router.get("/issn", controller.getAllIssn);
router.get("/tur", controller.getAllTur);
router.get("/turr", controller.getAllTurr);

export default router;
