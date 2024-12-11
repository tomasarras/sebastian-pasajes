import express from "express";
import controller from "../../controllers/iso/docController.js";
import verifyToken from "../../middleware/validateToken.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", verifyToken, controller.getAll);
router.get("/iso", verifyToken, controller.getAllIsoDoc);
router.get("/procesos", verifyToken, controller.getAllIsoProcesos);
router.get("/estados", verifyToken, controller.getAllIsoDocEstados);

export default router;
