import express from "express";
import controller from "../controllers/licencesController.js";
//import verifyToken from "../middleware/validateToken.js";

const router = express.Router();

router.get("/staff", controller.getAllStaff);

export default router;
