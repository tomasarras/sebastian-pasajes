import express from "express";
import controller from "../../controllers/iso/claimsController.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/c", controller.getAllC);
router.get("/t", controller.getAllT);

export default router;
