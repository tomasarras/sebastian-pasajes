import express from "express";
import controller from "../controllers/licencesController.js";
import verifyToken from "../middleware/validateToken.js";
import onlyAdministrators from "../middleware/onlyAdministrators.js";

const router = express.Router();

router.get("/staff", verifyToken, onlyAdministrators, controller.getAllStaff);

export default router;
