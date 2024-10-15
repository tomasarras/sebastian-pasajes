import express from "express";
import controller from "../../controllers/iso/evaluationsController.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/sells", controller.getAllSells);
router.get("/evc", controller.getAllEvc);
router.get("/adm", controller.getAllAdm);

export default router;
