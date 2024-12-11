import express from "express";
import controller from "../../controllers/iso/claimsController.js";
import verifyToken from "../../middleware/validateToken.js";

const router = express.Router();

router.get("/c", verifyToken, controller.getAllC);//Es publico
router.get("/t", verifyToken, controller.getAllT);//Es publico

export default router;
