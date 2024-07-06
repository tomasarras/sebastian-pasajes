import express from "express";
import controller from "../controllers/passengerController.js";
import verifyToken from "../middleware/validateToken.js";
const router = express.Router();

router.get("/", verifyToken, controller.getAll);

export default router;
